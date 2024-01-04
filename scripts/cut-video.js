const {FF_MPEG, ASSETS_FOLDER} = require("./constants");
const {executeCmd} = require("./execute-cmd");
const {renameFile} = require("./rename-file");

async function cutVideo(videoPath, videoDuration, newDuration) {
    console.log("Cut video", videoPath, ': ', videoDuration, '->', newDuration);
    const tempVideoFilename = `${ASSETS_FOLDER}/temp-${videoPath.split('/').pop()}`;
    //ffmpeg -i input.mp4  -c copy output.mp4
    const cutVideoCMD = `${FF_MPEG} -i "${videoPath}" -t ${newDuration} -c copy "${tempVideoFilename}"`;
    await executeCmd(cutVideoCMD);
    await renameFile(tempVideoFilename, videoPath);
}

exports.cutVideo = cutVideo;
