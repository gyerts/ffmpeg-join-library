const {ASSETS_FOLDER, VideoFiles} = require("./constants");
const {fixVideo} = require("./fix-video");

async function addVideoToVideoMergeList(filePath) {
    const fixedFilePath = await fixVideo(filePath);

    const safeFilePath = fixedFilePath.replace(`${ASSETS_FOLDER}/`, '');
    VideoFiles.push(safeFilePath);
}

exports.addVideoToVideoMergeList = addVideoToVideoMergeList;
