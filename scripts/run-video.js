const {validate} = require("./validate");
const {getArticleFilePath} = require("./get-article-file-path");
const {DB_VIDEO, DIST_FOLDER, settings} = require("../constants");
const {getDuration} = require("./get-duration");
const {isValidRevoicer, getAudioPathFromRevoicer} = require("./get-audio-path-from-revoicer");
const {getNameFromPath} = require("./get-name-from-path");
const {copyFile} = require("./copy-file");
const {checkIsAudioInVideoFile} = require("./check-is-audio-in-video-file");
const {removeAudioFromVideo} = require("./remove-audio-from-video");
const {speedupVideo} = require("./speedup-video");
const {cutVideo} = require("./cut-video");
const {addVideoToVideoMergeList} = require("./add-video-to-video-merge-list");
const {generateVideoFromLastFrame} = require("./generate-video-from-last-frame");
const {mergeVideos} = require("./merge-videos");
const {logIt} = require("./log");


async function runVideo(items, videoFileName) {
    const ar = [];
    let index = 0;
    const mergeList = [];

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const nextItem = items[i+1];
        const videoObject = nextItem ? nextItem.componentType === 'video' ? nextItem : null : null;

        validate(i, item, nextItem);

        if (i === 0 && item.componentType === 'autoplay-audio-plus-video') {
            const videoPath = getArticleFilePath(DB_VIDEO, item.data.videoSrc);
            const duration = await getDuration(videoPath);
            ar.push({
                audioDuration: duration,
                muteAudio: true,
                autoPlaybackRateSec: 0,
                videoPath,
            });
            settings.setMainVideoName(`${item.data.topic}.mp4`);
            items = items.filter(i => i.componentType !== 'autoplay-audio-plus-video');
            continue;
        } else if (i === 0) {
            const {
                fileUrl: audioFilePath,
                duration: audioFileDuration,
            } = getAudioPathFromRevoicer(item);

            ar.push({
                audioDuration: audioFileDuration,
                muteAudio: !item.data.unmuteAudio,
                autoPlaybackRateSec: item.data.autoPlaybackRateSec,
                videoPath: getArticleFilePath(DB_VIDEO, videoObject.data.fileUrl),
            });
            continue;
        }

        if (item.componentType === 'generate-audio-revoicer' && isValidRevoicer(item)) {
            const {
                fileUrl: audioFilePath,
                duration: audioFileDuration,
            } = getAudioPathFromRevoicer(item);

            if (!videoObject) {
                ar[index].audioDuration += item.data.pauseBeforePlay || 0;
                ar[index].audioDuration += audioFileDuration;
                continue;
            } else {
                ar[index].audioDuration += item.data.pauseBeforePlay || 0;
                ar[index].audioDuration += item.data.pauseBeforePlayVideo || 0;
            }

            index++;
            ar.push({
                audioDuration: audioFileDuration,
                muteAudio: !item.data.unmuteAudio,
                autoPlaybackRateSec: item.data.autoPlaybackRateSec,
                videoPath: getArticleFilePath(DB_VIDEO, videoObject.data.fileUrl),
            });
        }
    }

    if (ar.find(i => !i.audioDuration)) {
        throw new Error("Не должно быть аудио с длительностью о или false, или null и тд");
    }

    for (let i = 0; i < ar.length; i++) {
        const calculation = ar[i];
        console.log('\n=====================================')
        console.log(calculation);

        // Copy video file into assets folder
        const fileName = getNameFromPath(calculation.videoPath);
        const filePath = `${DIST_FOLDER}/${fileName}`;
        await copyFile(calculation.videoPath, filePath);

        if (calculation.muteAudio) { // video muted
            if (await checkIsAudioInVideoFile(filePath)) {
                await removeAudioFromVideo(filePath);
            }
        }

        if (calculation.autoPlaybackRateSec) {
            await speedupVideo(filePath, calculation.autoPlaybackRateSec);
        }

        const videoDuration = await getDuration(filePath);
        const lastIteration = i === ar.length - 1;

        if (videoDuration > calculation.audioDuration && !lastIteration) {
            await cutVideo(filePath, videoDuration, videoDuration - (videoDuration - calculation.audioDuration));
        }
        await addVideoToVideoMergeList(filePath, mergeList);

        if (videoDuration < calculation.audioDuration) {
            const videoPath = await generateVideoFromLastFrame(filePath, calculation.audioDuration - videoDuration);
            // logIt(videoPath, 'Add frozen video, duration:', await getDuration(videoPath));
            await addVideoToVideoMergeList(videoPath, mergeList);
        }

        console.log();
    }

    await mergeVideos(mergeList, videoFileName);
}

exports.runVideo = runVideo;