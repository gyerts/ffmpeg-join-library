const {validate} = require("./validate");
const {getArticleFilePath} = require("./get-article-file-path");
const {DB_VIDEO} = require("../constants");
const {getDuration} = require("./get-duration");
const {generateSilenceMp3} = require("./generate-silence-mp3");
const {addAudioToAudioMergeList} = require("./add-audio-to-audio-merge-list");
const {isValidRevoicer, getAudioPathFromRevoicer} = require("./get-audio-path-from-revoicer");
const {mergeAudios} = require("./merge-audios");
const {logIt} = require("./log");

async function runAudio(items, audioFileName, partIndex) {
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const nextItem = items[i+1];
        const videoObject = nextItem ? nextItem.componentType === 'video' ? nextItem : null : null;

        validate(i, item, nextItem);

        if (i === 0 && item.componentType === 'autoplay-audio-plus-video') {
            const videoPath = getArticleFilePath(DB_VIDEO, item.data.videoSrc);
            const duration = await getDuration(videoPath);
            const name = await generateSilenceMp3(duration);
            logIt(name, `Generate silence.mp3 for "${item.data.topic}", seconds`, duration);
            await addAudioToAudioMergeList(name, false, duration, partIndex, i === 0);
            items = items.filter(i => i.componentType !== 'autoplay-audio-plus-video');
            continue;
        }

        if (item.componentType === 'generate-audio-revoicer' && isValidRevoicer(item)) {
            const {
                fileUrl: audioFilePath,
                duration: audioFileDuration,
            } = getAudioPathFromRevoicer(item);

            if (!item.data.unmuteAudio) {
                if (item.data.autoPlaybackRateSec) {

                }
            }

            if (item.data.pauseBeforePlay) {
                logIt(audioFilePath, 'Generate silence.mp3 for seconds', item.data.pauseBeforePlay);
                const name = await generateSilenceMp3(item.data.pauseBeforePlay);
                await addAudioToAudioMergeList(name, false, item.data.pauseBeforePlay, partIndex, i === 0);
            }

            await addAudioToAudioMergeList(audioFilePath, !!videoObject, audioFileDuration, partIndex, i === 0);
        }
    }

    await mergeAudios(audioFileName, partIndex);
}

exports.runAudio = runAudio;