const {fixVideo} = require("./fix-video");
const {getDuration} = require("./get-duration");
const {logIt} = require("./log");

async function addVideoToVideoMergeList(filePath, mergeList) {
    const fixedFilePath = await fixVideo(filePath);
    mergeList.push(fixedFilePath);
    logIt(fixedFilePath, 'Add video, duration:', await getDuration(fixedFilePath));
}

exports.addVideoToVideoMergeList = addVideoToVideoMergeList;
