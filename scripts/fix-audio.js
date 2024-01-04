const {FF_MPEG, DIST_FOLDER} = require("../constants");
const {executeCmd} = require("./execute-cmd");

async function fixAudio(filePath, fileName, duration) {
    const fixedFilename = `fixed-${fileName}.wav`;
    const fixAudioCMD = `${FF_MPEG} -i ${filePath} -t ${duration} -ar 44100 -ac 2 ${DIST_FOLDER}/${fixedFilename}`;
    await executeCmd(fixAudioCMD);
    return fixedFilename;
}

exports.fixAudio = fixAudio;
