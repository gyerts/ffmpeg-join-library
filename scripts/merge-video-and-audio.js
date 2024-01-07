const { join, sep } = require('path');
const {FF_MPEG, DIST_FOLDER} = require("../constants");
const {executeCmd} = require("./execute-cmd");
const {getDuration} = require("./get-duration");
const {generateSilenceMp3} = require("./generate-silence-mp3");
const {renameFile} = require("./rename-file");
const {generateVideoFromLastFrame} = require("./generate-video-from-last-frame");
const {logIt} = require("./log");
const {mergeAllVideos} = require("./merge-all-videos");
const {getNameFromPath} = require("./get-name-from-path");
const {addAudioToFrontendLogs, addVideoToFrontendLogs} = require("./debugger");

async function mergeVideoAndAudio(videoFilePath, audioFilePath, mainVideoPath) {
    console.log("Merge Video And Audio");

    const videoDuration = await getDuration(videoFilePath);
    const audioDuration = await getDuration(audioFilePath);

    if (audioDuration < videoDuration && (videoDuration - audioDuration > 0.1)) {
        logIt(audioFilePath, 'Make audio longer', audioDuration, '->', videoDuration);
        const silenceFilePath = await generateSilenceMp3(videoDuration - audioDuration);

        const silenceDuration = await getDuration(silenceFilePath);
        addAudioToFrontendLogs(silenceFilePath, silenceDuration, '');

        const tempAudioPath = join(DIST_FOLDER, 'temp.mp3');
        await executeCmd(
            `${FF_MPEG} -i ${audioFilePath} -i ${silenceFilePath} -filter_complex "[0:a][1:a]concat=n=2:v=0:a=1" ${tempAudioPath}`
        );
        await renameFile(tempAudioPath, audioFilePath);
    }

    if (videoDuration < audioDuration && (audioDuration - videoDuration > 0.1)) {
        logIt(audioFilePath, 'Make video longer', videoDuration, '->', audioDuration);
        const frozenVideoPath = await generateVideoFromLastFrame(videoFilePath, audioDuration - videoDuration);
        const tempMainVideoPath = join(DIST_FOLDER, `temp-${getNameFromPath(videoFilePath)}`);

        const frozenDuration = await getDuration(frozenVideoPath);
        addVideoToFrontendLogs(frozenVideoPath, frozenDuration);

        await mergeAllVideos([
            videoFilePath,
            frozenVideoPath,
        ], tempMainVideoPath);

        await renameFile(tempMainVideoPath, videoFilePath);
    }

    const concatCMD = `${FF_MPEG} -i ${videoFilePath} -i ${audioFilePath} -c:v copy -c:a aac -strict experimental ${mainVideoPath}`;
    console.log(concatCMD);
    await executeCmd(concatCMD);

    console.log('\n\n\n');
}

exports.mergeVideoAndAudio = mergeVideoAndAudio;
