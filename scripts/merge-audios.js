const {FF_MPEG, MERGE_AUDIO_PATH, MAIN_AUDIO_PATH, ASSETS_FOLDER} = require("./constants");
const {executeCmd} = require("./execute-cmd");
const {removeFile} = require("./remove-file");

async function mergeAudios() {
    console.log(`Слияние audio`);
    const highQualityAudio = `${ASSETS_FOLDER}/high-quality-audio.wav`;
    const concatCMD = `${FF_MPEG} -f concat -safe 0 -i ${MERGE_AUDIO_PATH} -c copy ${highQualityAudio}`;
    await executeCmd(concatCMD);
    const convertCMD = `${FF_MPEG} -i ${highQualityAudio} -codec:a libmp3lame -qscale:a 2 ${MAIN_AUDIO_PATH}`;
    await executeCmd(convertCMD);
    removeFile(highQualityAudio);
}

exports.mergeAudios = mergeAudios;
