const {FF_MPEG, MAIN_VIDEO_PATH, MAIN_AUDIO_PATH} = require("../constants");
const {executeCmd} = require("./execute-cmd");

async function mergeVideoAndAudio() {
    console.log("Merge Video And Audio");
    const concatCMD = `${FF_MPEG} -i ${MAIN_VIDEO_PATH} -i ${MAIN_AUDIO_PATH} -c:v copy -c:a aac -strict experimental output.mp4`;
    await executeCmd(concatCMD);
}

exports.mergeVideoAndAudio = mergeVideoAndAudio;
