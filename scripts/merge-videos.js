const {FF_MPEG} = require("../constants");
const {executeCmd} = require("./execute-cmd");

async function mergeVideos(files, name, includeAudio) {
    console.log('Merge videos:', files);
    const args1 = files.map(i => `-i ${i}`)
    const args2 = files.map((i, index) => `[${index}:v]${includeAudio ? `[${index}:a]` : ''}`)

    const concatCMD = `${FF_MPEG} ${args1.join(' ')} -filter_complex "${args2.join('')}concat=n=${files.length}:v=1:a=${includeAudio ? 1:0}" -r 30 ${name}`;
    await executeCmd(concatCMD);
}

exports.mergeVideos = mergeVideos;
