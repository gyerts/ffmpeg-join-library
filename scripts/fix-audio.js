const {join} = require("path");
const {FF_MPEG, DIST_FOLDER} = require("../constants");
const {executeCmd} = require("./execute-cmd");
const {getNameFromPath} = require("./get-name-from-path");

async function fixAudio(filePath, duration) {
    const fileName = getNameFromPath(filePath);
    const fixedFilePath = join(DIST_FOLDER, `fixed-${fileName}.wav`);
    const fixAudioCMD = `${FF_MPEG} -i ${filePath} -t ${duration} -ar 44100 -ac 2 ${fixedFilePath}`;
    await executeCmd(fixAudioCMD);
    return fixedFilePath;
}

exports.fixAudio = fixAudio;
