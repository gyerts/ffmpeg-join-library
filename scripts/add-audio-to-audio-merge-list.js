const {MERGE_AUDIO_PATH, DIST_FOLDER} = require("../constants");
const {executeCmd} = require("./execute-cmd");
const {fixAudio} = require("./fix-audio");
const {getDuration} = require("./get-duration");

let i = 0;

async function addAudioToAudioMergeList(filePath, hasOwnVideo, duration) {
    const fileName = filePath.split('/').pop();

    const beforeDuration = await getDuration(filePath);
    const finalFilename = await fixAudio(filePath, fileName, duration);
    const afterDuration = await getDuration(`${DIST_FOLDER}/${finalFilename}`);

    console.log('Add fixed audio', fileName, `with duration (${duration})`, beforeDuration, '->', afterDuration, 'has own video', hasOwnVideo);

    if (i === 0) {
        const addAudioCmd = `echo "file '${finalFilename}'" > ${MERGE_AUDIO_PATH}\n`;
        await executeCmd(addAudioCmd);
    } else {
        const addAudioCmd = `echo "file '${finalFilename}'" >> ${MERGE_AUDIO_PATH}\n`;
        await executeCmd(addAudioCmd);
    }
    i++;
}

exports.addAudioToAudioMergeList = addAudioToAudioMergeList;
