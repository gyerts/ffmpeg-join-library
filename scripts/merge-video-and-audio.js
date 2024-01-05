const {FF_MPEG} = require("../constants");
const {executeCmd} = require("./execute-cmd");

async function mergeVideoAndAudio(videoFileName, audioFileName, mainVideoName) {
    console.log("Merge Video And Audio");
    const concatCMD = `${FF_MPEG} -i ${videoFileName} -i ${audioFileName} -c:v copy -c:a aac -strict experimental ${mainVideoName}`;
    await executeCmd(concatCMD);
}

exports.mergeVideoAndAudio = mergeVideoAndAudio;
