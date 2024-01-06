const { join } = require('path');
const {getDuration} = require("./get-duration");
const {FF_MPEG, DIST_FOLDER} = require("../constants");
const {executeCmd} = require("./execute-cmd");
const {renameFile} = require("./rename-file");
const {getNameFromPath} = require("./get-name-from-path");
const {logIt} = require("./log");

async function speedupVideo(videoPath, autoPlaybackRateSec) {
    const tempVideoFilename = join(DIST_FOLDER, `temp-${getNameFromPath(videoPath)}`);
    const videoDuration = await getDuration(videoPath);
    const playbackRate = autoPlaybackRateSec / videoDuration;
    logIt(videoPath, 'Speed up/down video', videoDuration, '->', autoPlaybackRateSec, 'playbackRate=(', playbackRate, ')');
    const speedupVideoCMD = `${FF_MPEG} -i "${videoPath}" -filter:v "setpts=${playbackRate}*PTS" -c:a copy "${tempVideoFilename}"`;
    await executeCmd(speedupVideoCMD);
    await renameFile(tempVideoFilename, videoPath);
}

exports.speedupVideo = speedupVideo;
