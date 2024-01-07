const {FF_MPEG} = require("../constants");
const {executeCmd} = require("./execute-cmd");
const {setLoading} = require("./debugger");
const {getNameFromPath} = require("./get-name-from-path");

async function mergeVideos(files, name, includeAudio) {
    console.log('Merge videos ->', files, '<- Merge videos');
    const args1 = files.map(i => `-i ${i}`)
    const args2 = files.map((i, index) => `[${index}:v]${includeAudio ? `[${index}:a]` : ''}`)

    setLoading(`<span>Merge videos into</span><br>${getNameFromPath(name)}`);

    const concatCMD = `${FF_MPEG} ${args1.join(' ')} -filter_complex "${args2.join('')}concat=n=${files.length}:v=1:a=${includeAudio ? 1:0}" -r 30 ${name}`;
    await executeCmd(concatCMD);
    setLoading('');
}

exports.mergeVideos = mergeVideos;
