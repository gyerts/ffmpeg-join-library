const { join } = require('path');
const {executeCmd} = require("./execute-cmd");
const {FF_MPEG, DIST_FOLDER} = require("../constants");
const {renameFile} = require("./rename-file");
const {getNameFromPath} = require("./get-name-from-path");
const {logIt} = require("./log");

async function removeAudioFromVideo(videoPath) {
    logIt(videoPath, 'Remove audio from video');
    const tempVideoFilename = join(DIST_FOLDER, `temp-${getNameFromPath(videoPath)}`);
    const removeAudioCMD = `${FF_MPEG} -i "${videoPath}" -c:v copy -an "${tempVideoFilename}"`;
    await executeCmd(removeAudioCMD);
    await renameFile(tempVideoFilename, videoPath);
}

exports.removeAudioFromVideo = removeAudioFromVideo;
