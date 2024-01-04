const exec = require('child_process').exec;
const { FF_PROBE} = require('../constants');

function checkIsAudioInVideoFile(fileName) {
    const CMD = `${FF_PROBE} -v error -select_streams a -show_entries stream=index,codec_type -of csv=p=0 ${fileName}`;
    return new Promise((resolve, reject) => {
        return exec(CMD, function (error, stdout, stderr) {
            if (!stderr && !stdout) {
                resolve(false);
            } else if (!stderr && stdout) {
                resolve(true);
            } else if (stderr) {
                reject();
            }
        });
    })
}

exports.checkIsAudioInVideoFile = checkIsAudioInVideoFile;
