const {FF_MPEG, resolution, ASSETS_FOLDER} = require("./constants");
const {executeCmd} = require("./execute-cmd");
const {getVideoResolution} = require("./get-video-resolution");

async function fixVideo(filePath) {
    const videoResolution = await getVideoResolution(filePath);

    if (videoResolution !== resolution) {
        console.log(`Fix video ${filePath}, video(${videoResolution}) !== required(${resolution})`);
        const fixedFilename = `fixed-${filePath.split('/').pop()}`;
        const fixedFilepath = `${ASSETS_FOLDER}/${fixedFilename}`;
        const fixVideoCMD = `${FF_MPEG} -i ${filePath} -vf "scale=${resolution},setsar=1:1" -c:v libx265 -c:a aac -strict experimental ${fixedFilepath}`;
        await executeCmd(fixVideoCMD);
        return fixedFilepath;
    }

    return filePath;
}

exports.fixVideo = fixVideo;
