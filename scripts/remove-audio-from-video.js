const {executeCmd} = require("./execute-cmd");
const {FF_MPEG, ASSETS_FOLDER} = require("./constants");
const {renameFile} = require("./rename-file");

async function removeAudioFromVideo(videoPath) {
    console.log("Remove audio from video", videoPath.split('/').pop());
    const tempVideoFilename = `${ASSETS_FOLDER}/temp-${videoPath.split('/').pop()}`;
    const removeAudioCMD = `${FF_MPEG} -i "${videoPath}" -c:v copy -an "${tempVideoFilename}"`;
    await executeCmd(removeAudioCMD);
    await renameFile(tempVideoFilename, videoPath);
}

exports.removeAudioFromVideo = removeAudioFromVideo;
