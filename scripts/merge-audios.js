const { join } = require('path');
const {FF_MPEG, DIST_FOLDER} = require("../constants");
const {executeCmd} = require("./execute-cmd");
const {removeFile} = require("./remove-file");
const {getMergeAudioListPath} = require("./get-merge-audio-list-path");

async function mergeAudios(audioFileName, partIndex) {
    console.log(`Слияние audio`);
    const highQualityAudio = join(DIST_FOLDER, 'high-quality-audio.wav');
    const mergeListPath = getMergeAudioListPath(partIndex);

    const concatCMD = `${FF_MPEG} -f concat -safe 0 -i ${mergeListPath} -c copy ${highQualityAudio}`;
    await executeCmd(concatCMD);
    const convertCMD = `${FF_MPEG} -i ${highQualityAudio} -codec:a libmp3lame -qscale:a 2 ${audioFileName}`;
    await executeCmd(convertCMD);
    removeFile(highQualityAudio);
}

exports.mergeAudios = mergeAudios;
