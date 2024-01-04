const {filterMediaObjects} = require("./scripts/filter-media-objects");
const {validate} = require("./scripts/validate");
const {getAudioPathFromRevoicer} = require("./scripts/get-audio-path-from-revoicer");
const {addAudioToAudioMergeList} = require("./scripts/add-audio-to-audio-merge-list");
const {generateSilenceMp3} = require("./scripts/generate-silence-mp3");
const {mergeAudios} = require("./scripts/merge-audios");
const {getDuration} = require("./scripts/get-duration");
const {getArticleFilePath} = require("./scripts/get-article-file-path");
const {DB_VIDEO, DIST_FOLDER} = require("./constants");
const {copyFile} = require("./scripts/copy-file");
const {checkIsAudioInVideoFile} = require("./scripts/check-is-audio-in-video-file");
const {removeAudioFromVideo} = require("./scripts/remove-audio-from-video");
const {speedupVideo} = require("./scripts/speedup-video");
const {cutVideo} = require("./scripts/cut-video");
const {generateVideoFromLastFrame} = require("./scripts/generate-video-from-last-frame");
const {addVideoToVideoMergeList} = require("./scripts/add-video-to-video-merge-list");
const {mergeVideos} = require("./scripts/merge-videos");
const {mergeVideoAndAudio} = require("./scripts/merge-video-and-audio");
const {resetDistFolder} = require("./scripts/reset-dist-folder");

resetDistFolder();

async function runAudio() {
    const items = await filterMediaObjects();

    for (let i = 0; i < items.length; i++) {
        // console.log(`Обработка элемента ${i + 1} из ${items.length}`);
        const item = items[i];
        const nextItem = items[i+1];
        const videoObject = nextItem ? nextItem.componentType === 'video' ? nextItem : null : null;

        validate(i, item, nextItem);

        if (item.componentType === 'generate-audio-revoicer') {
            const {
                fileUrl: audioFilePath,
                duration: audioFileDuration,
            } = getAudioPathFromRevoicer(item);

            if (!item.data.unmuteAudio) {
                if (item.data.autoPlaybackRateSec) {

                }
            }

            if (item.data.pauseBeforePlay) {
                console.log(`Generate silence.mp3 for ${item.data.pauseBeforePlay} seconds`,
                    audioFilePath.split('/').pop());
                const name = await generateSilenceMp3(item.data.pauseBeforePlay);
                await addAudioToAudioMergeList(name, false, audioFileDuration);
            }

            await addAudioToAudioMergeList(audioFilePath, !!videoObject, audioFileDuration);
        }
    }

    await mergeAudios();
}

async function runVideo() {
    const items = await filterMediaObjects();

    const ar = [];
    let index = 0;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const nextItem = items[i+1];
        const videoObject = nextItem ? nextItem.componentType === 'video' ? nextItem : null : null;

        validate(i, item, nextItem);

        if (i === 0) {
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

        if (item.componentType === 'generate-audio-revoicer') {
            const {
                fileUrl: audioFilePath,
                duration: audioFileDuration,
            } = getAudioPathFromRevoicer(item);

            if (!videoObject) {
                ar[index].audioDuration += item.data.pauseBeforePlay || 0;
                ar[index].audioDuration += audioFileDuration;
                continue;
            } else {
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

    console.log(ar);

    if (ar.find(i => !i.audioDuration)) {
        throw new Error("Не должно быть аудио с длительностью о или false, или null и тд");
    }

    for (let i = 0; i < ar.length; i++) {
        const calculation = ar[i];

        // Copy video file into assets folder
        const fileName = calculation.videoPath.split('/').pop();
        const filePath = `${DIST_FOLDER}/${fileName}`;
        await copyFile(calculation.videoPath, filePath);
        await addVideoToVideoMergeList(filePath);

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

        if (videoDuration < calculation.audioDuration) {
            const videoPath = await generateVideoFromLastFrame(filePath, calculation.audioDuration - videoDuration);
            console.log('Add frozen video, duration: ', await getDuration(videoPath));
            await addVideoToVideoMergeList(videoPath);
        } else if (videoDuration > calculation.audioDuration && !lastIteration) {
            await cutVideo(filePath, videoDuration, videoDuration - (videoDuration - calculation.audioDuration));
        }

        console.log('Add video, duration: ', await getDuration(filePath));
        console.log();
    }

    await mergeVideos();
}

(async () => {
    await runAudio();
    await runVideo();
    await mergeVideoAndAudio();
})();
