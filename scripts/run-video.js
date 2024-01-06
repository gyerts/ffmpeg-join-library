const {validate} = require("./validate");
const {getArticleFilePath} = require("./get-article-file-path");
const {DB_VIDEO, DIST_FOLDER, settings, DB_IMAGE} = require("../constants");
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
const {makeVideoFromSpriteImage} = require("./make-video-from-sprite-image");


async function runVideo(items, videoFileName) {
    const ar = [];
    let index = 0;
    const mergeList = [];
    let autoplayAudioPlusVideoMet = false;
    let isFirstContentVideo = true;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const nextItem = items[i+1];
        const videoObject = nextItem ? nextItem.componentType === 'video' ? nextItem : null : null;
        const isItemIsRevoicer = item.componentType === 'generate-audio-revoicer' && isValidRevoicer(item);

        let isStartUpVideo = item.componentType === 'autoplay-audio-plus-video' && !autoplayAudioPlusVideoMet;

        const imageObject = nextItem ? nextItem.componentType === 'image' ? nextItem : null : null;
        let spriteVideoPath = '';

        const addVideo = (audioFileDuration) => {
            isFirstContentVideo = false;
            if (videoObject) {
                ar.push({
                    audioDuration: audioFileDuration,
                    muteAudio: !item.data.unmuteAudio,
                    autoPlaybackRateSec: item.data.autoPlaybackRateSec,
                    videoPath: getArticleFilePath(DB_VIDEO, videoObject.data.fileUrl),
                });
            }
            if (imageObject) {
                ar.push({
                    audioDuration: audioFileDuration,
                    muteAudio: false,
                    autoPlaybackRateSec: 0,
                    videoPath: spriteVideoPath,
                });
            }
        }


        validate(i, item, nextItem);


        if (imageObject) {
            const spritePath = getArticleFilePath(DB_IMAGE, imageObject.data.fileUrl);
            spriteVideoPath = await makeVideoFromSpriteImage(
                spritePath,
                +imageObject.data.options.cols,
                +imageObject.data.options.frames
            );
        }

        if (isStartUpVideo) {
            autoplayAudioPlusVideoMet = true;

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
        }

        if (isItemIsRevoicer) {
            const {
                fileUrl: audioFilePath,
                duration: audioFileDuration,
            } = getAudioPathFromRevoicer(item);

            if (isFirstContentVideo) {
                addVideo(audioFileDuration);
            } else {
                ar[index].audioDuration += item.data.pauseBeforePlay || 0;

                if (!videoObject && !imageObject) {
                    // Если далее нет ни видео ни картинки, это значит что это простой аудио файл
                    // просто нужно добавить длину этого аудио, и перейти на следующую итерацию.
                    ar[index].audioDuration += audioFileDuration;
                } else {
                    // если все же есть у этого объекта видео или картинка, то это означает что,
                    // во-первых, это следующий фрагмент, потому увеличиваем индекс,
                    // во-вторых, предыдущему индексу также нужно добавить значение задержки видео.
                    index++;
                    ar[index-1].audioDuration += item.data.pauseBeforePlayVideo || 0;
                    addVideo(audioFileDuration);
                }
            }
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