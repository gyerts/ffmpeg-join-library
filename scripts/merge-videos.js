const {FF_MPEG, ASSETS_FOLDER, VideoFiles, MAIN_VIDEO_PATH} = require("./constants");
const {executeCmd} = require("./execute-cmd");

async function mergeVideos() {
    console.log('Merge videos!', VideoFiles);
    const args1 = VideoFiles.map(i => `-i ${ASSETS_FOLDER}/${i}`)
    const args2 = VideoFiles.map((i, index) => `[${index}:v]`)

    const concatCMD = `${FF_MPEG} ${args1.join(' ')} -filter_complex "${args2.join('')}concat=n=${VideoFiles.length}:v=1:a=0" -r 30 ${MAIN_VIDEO_PATH}`;
    await executeCmd(concatCMD);
}

exports.mergeVideos = mergeVideos;
