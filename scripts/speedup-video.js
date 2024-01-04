const {getDuration} = require("./get-duration");
const {FF_MPEG, ASSETS_FOLDER} = require("./constants");
const {executeCmd} = require("./execute-cmd");
const {renameFile} = require("./rename-file");

async function speedupVideo(videoPath, autoPlaybackRateSec) {
    const tempVideoFilename = `${ASSETS_FOLDER}/temp-${videoPath.split('/').pop()}`;
    const videoDuration = await getDuration(videoPath);
    const playbackRate = autoPlaybackRateSec / videoDuration;
    console.log(`Speed up/down video`, videoDuration, '->', autoPlaybackRateSec, `playbackRate=${playbackRate}`);
    const speedupVideoCMD = `${FF_MPEG} -i "${videoPath}" -filter:v "setpts=${playbackRate}*PTS" -c:a copy "${tempVideoFilename}"`;
    await executeCmd(speedupVideoCMD);
    await renameFile(tempVideoFilename, videoPath);
}

exports.speedupVideo = speedupVideo;
