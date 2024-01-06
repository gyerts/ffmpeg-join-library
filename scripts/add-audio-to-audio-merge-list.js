const { join } = require('path');
const {DIST_FOLDER} = require("../constants");
const {executeCmd} = require("./execute-cmd");
const {fixAudio} = require("./fix-audio");
const {getDuration} = require("./get-duration");
const {getNameFromPath} = require("./get-name-from-path");
const {getMergeAudioListPath} = require("./get-merge-audio-list-path");
const {logIt} = require("./log");

let i = 0;

async function addAudioToAudioMergeList(filePath, hasOwnVideo, duration, partIndex, reset) {
    if (reset) {
        i = 0;
    }

    const fileName = getNameFromPath(filePath);

    const beforeDuration = await getDuration(filePath);
    const mergeListPath = getMergeAudioListPath(partIndex);
    let finalFilePath = filePath;

    if (!fileName.endsWith('.wav')) {
        finalFilePath = await fixAudio(filePath, duration);
        const afterDuration = await getDuration(finalFilePath);
        logIt(fileName, 'Add fixed audio with duration ( before ->', duration, ')', beforeDuration, '->', afterDuration, 'has own video', hasOwnVideo);
    } else {
        logIt(fileName, 'Add audio with duration ( before ->', duration, ')', beforeDuration, 'has own video', hasOwnVideo);
    }

    if (i === 0) {
        const addAudioCmd = `echo "file '${finalFilePath}'" > ${mergeListPath}\n`;
        await executeCmd(addAudioCmd);
    } else {
        const addAudioCmd = `echo "file '${finalFilePath}'" >> ${mergeListPath}\n`;
        await executeCmd(addAudioCmd);
    }
    i++;
}

exports.addAudioToAudioMergeList = addAudioToAudioMergeList;
