const fs = require('fs');
const {fixVideo} = require("./fix-video");
const {getDuration} = require("./get-duration");
const {logIt} = require("./log");
const {PATH_TO_APP_LOGS_FILE} = require("../constants");

async function addVideoToVideoMergeList(filePath, mergeList) {
    const fixedFilePath = await fixVideo(filePath);
    mergeList.push(fixedFilePath);

    const duration = await getDuration(fixedFilePath);
    logIt(fixedFilePath, 'Add video, duration:', duration);
    addVideoToFrontendLogs(fixedFilePath, duration);
}

exports.addVideoToVideoMergeList = addVideoToVideoMergeList;

function addVideoToFrontendLogs(name, duration) {
    const text = fs.readFileSync(PATH_TO_APP_LOGS_FILE, { encoding: "utf8" });
    const obj = JSON.parse(text);

    obj.videos.push({ name, duration });

    fs.writeFileSync(PATH_TO_APP_LOGS_FILE, JSON.stringify(obj, null, 2));
}