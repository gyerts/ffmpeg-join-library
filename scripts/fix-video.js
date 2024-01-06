const { join, sep } = require('path');
const {FF_MPEG, resolution, DIST_FOLDER} = require("../constants");
const {executeCmd} = require("./execute-cmd");
const {getVideoResolution} = require("./get-video-resolution");
const {getNameFromPath} = require("./get-name-from-path");
const {logIt} = require("./log");

async function fixVideo(filePath) {
    const videoResolution = await getVideoResolution(filePath);

    if (videoResolution !== resolution) {
        const fixedFilename = `fixed-${getNameFromPath(filePath)}`;
        const fixedFilepath = join(DIST_FOLDER, fixedFilename);
        logIt(filePath, 'Fix video, video(', videoResolution, ') !== required(', resolution, ') [', fixedFilepath, ']');
        const fixVideoCMD = `${FF_MPEG} -i ${filePath} -vf "scale=${resolution},setsar=1:1" -c:v libx264 -c:a aac -strict experimental ${fixedFilepath}`;
        await executeCmd(fixVideoCMD);
        return fixedFilepath;
    }

    return filePath;
}

exports.fixVideo = fixVideo;
