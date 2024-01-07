const {fixVideo} = require("./fix-video");
const {getDuration} = require("./get-duration");
const {logIt} = require("./log");
const {addVideoToFrontendLogs} = require("./debugger");

async function addVideoToVideoMergeList(filePath, mergeList) {
    const fixedFilePath = await fixVideo(filePath);
    mergeList.push(fixedFilePath);

    const duration = await getDuration(fixedFilePath);
    logIt(fixedFilePath, 'Add video, duration:', duration);
    addVideoToFrontendLogs(fixedFilePath, duration);
}

exports.addVideoToVideoMergeList = addVideoToVideoMergeList;
