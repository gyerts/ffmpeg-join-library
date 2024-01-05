const { join, sep } = require('path');
const {FF_MPEG, DIST_FOLDER} = require("../constants");
const {executeCmd} = require("./execute-cmd");
const {getDuration} = require("./get-duration");
const {generateSilenceMp3} = require("./generate-silence-mp3");
const {renameFile} = require("./rename-file");
const {generateVideoFromLastFrame} = require("./generate-video-from-last-frame");
const {logIt} = require("./log");

async function mergeVideoAndAudio(videoFilePath, audioFilePath, mainVideoName) {
    console.log("Merge Video And Audio");

    const videoDuration = await getDuration(videoFilePath);
    const audioDuration = await getDuration(audioFilePath);

    if (audioDuration < videoDuration && (videoDuration - audioDuration > 0.1)) {
        const silenceFilePath = await generateSilenceMp3(videoDuration - audioDuration);
        const tempAudioPath = join(DIST_FOLDER, 'temp.mp3');
        await executeCmd(
            `${FF_MPEG} -i ${audioFilePath} -i ${silenceFilePath} -filter_complex "[0:a][1:a]concat=n=2:v=0:a=1" ${tempAudioPath}`
        );
        await renameFile(tempAudioPath, audioFilePath);
        logIt(audioFilePath, 'Make audio longer', audioDuration, '->', videoDuration, 'after ->', await getDuration(audioFilePath));
    }

    if (videoDuration < audioDuration && (audioDuration - videoDuration > 0.1)) {
        const frozenVideoPath = await generateVideoFromLastFrame(videoFilePath, audioDuration - videoDuration);
        const tempVideoPath = join(DIST_FOLDER, 'temp.mp4');
        await executeCmd(
            `${FF_MPEG} -i ${videoFilePath} -i ${frozenVideoPath} -filter_complex "[0:v][1:v]concat=n=2:v=1:a=0" ${tempVideoPath}`
        );
        await renameFile(tempVideoPath, videoFilePath);
        logIt(audioFilePath, 'Make video longer', videoDuration, '->', audioDuration, 'after ->', await getDuration(videoFilePath));
    }

    const concatCMD = `${FF_MPEG} -i ${videoFilePath} -i ${audioFilePath} -c:v copy -c:a aac -strict experimental ${mainVideoName}`;
    await executeCmd(concatCMD);
}

exports.mergeVideoAndAudio = mergeVideoAndAudio;
