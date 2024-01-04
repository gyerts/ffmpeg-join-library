const {executeCmd} = require("./execute-cmd");
const {FF_MPEG, ASSETS_FOLDER} = require("./constants");

async function generateSilenceMp3(duration) {
    const filename = `${ASSETS_FOLDER}/silence-${duration}.mp3`;
    const genSilenceAudio = `${FF_MPEG} -f lavfi -i anullsrc=r=44100:cl=stereo -t ${duration} ${filename}`;
    await executeCmd(genSilenceAudio);
    return filename;
}

exports.generateSilenceMp3 = generateSilenceMp3;
