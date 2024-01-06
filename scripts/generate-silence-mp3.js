const { join } = require('path');
const {executeCmd} = require("./execute-cmd");
const {FF_MPEG, DIST_FOLDER} = require("../constants");

async function generateSilenceMp3(duration) {
    const filename = join(DIST_FOLDER, `silence-${duration}.wav`);
    const genSilenceAudio = `${FF_MPEG} -f lavfi -i anullsrc=r=44100:cl=stereo -t ${duration} ${filename}`;
    await executeCmd(genSilenceAudio);
    return filename;
}

exports.generateSilenceMp3 = generateSilenceMp3;
