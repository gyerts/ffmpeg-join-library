const fs = require('fs');
const {join} = require('path');
const {FF_MPEG, DIST_FOLDER} = require("../constants");
const {executeCmd} = require("./execute-cmd");

const ALL_VIDEOS_MERGE_FILE = join(DIST_FOLDER, 'all-videos-merge.txt');

async function mergeAllVideos(videos, outputFilePath) {
    let data = `${videos.map(i => `file '${i}'`).join('\n')}`;
    fs.writeFileSync(ALL_VIDEOS_MERGE_FILE, data);

    const CMD = `${FF_MPEG} -f concat -safe 0 -i ${ALL_VIDEOS_MERGE_FILE} -c copy ${outputFilePath}`;
    await executeCmd(CMD);
}

exports.mergeAllVideos = mergeAllVideos;
