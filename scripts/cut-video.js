const { join } = require('path');
const {FF_MPEG, DIST_FOLDER} = require("../constants");
const {executeCmd} = require("./execute-cmd");
const {renameFile} = require("./rename-file");
const {getNameFromPath} = require("./get-name-from-path");

async function cutVideo(videoPath, videoDuration, newDuration) {
    console.log(`[${videoPath}] Cut video`, ': ', videoDuration, '->', newDuration);
    const tempVideoFilename = join(DIST_FOLDER, `temp-${getNameFromPath(videoPath)}`);
    const cutVideoCMD = `${FF_MPEG} -i "${videoPath}" -t ${newDuration} -c copy "${tempVideoFilename}"`;
    await executeCmd(cutVideoCMD);
    await renameFile(tempVideoFilename, videoPath);
}

exports.cutVideo = cutVideo;
