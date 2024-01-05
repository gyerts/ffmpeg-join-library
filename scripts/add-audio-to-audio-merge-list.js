const { join } = require('path');
const {DIST_FOLDER} = require("../constants");
const {executeCmd} = require("./execute-cmd");
const {fixAudio} = require("./fix-audio");
const {getDuration} = require("./get-duration");
const {getNameFromPath} = require("./get-name-from-path");
const {getMergeAudioListPath} = require("./get-merge-audio-list-path");

let i = 0;

async function addAudioToAudioMergeList(filePath, hasOwnVideo, duration, partIndex, reset) {
    if (reset) {
        i = 0;
    }

    const fileName = getNameFromPath(filePath);

    const beforeDuration = await getDuration(filePath);
    const finalFilename = await fixAudio(filePath, fileName, duration);
    const afterDuration = await getDuration(join(DIST_FOLDER, finalFilename));
    const mergeListPath = getMergeAudioListPath(partIndex);

    console.log('Add fixed audio', fileName, `with duration (${duration})`, beforeDuration, '->', afterDuration, 'has own video', hasOwnVideo);

    if (i === 0) {
        const addAudioCmd = `echo "file '${finalFilename}'" > ${mergeListPath}\n`;
        await executeCmd(addAudioCmd);
    } else {
        const addAudioCmd = `echo "file '${finalFilename}'" >> ${mergeListPath}\n`;
        await executeCmd(addAudioCmd);
    }
    i++;
}

exports.addAudioToAudioMergeList = addAudioToAudioMergeList;
