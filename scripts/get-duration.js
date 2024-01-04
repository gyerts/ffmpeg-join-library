const {FF_PROBE} = require("./constants");
const exec = require('child_process').exec;

function getDuration(fileName) {
    const CMD = `${FF_PROBE} -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${fileName}`;
    return new Promise((resolve, reject) => {
        exec(CMD, function (error, stdout, stderr) {
            if (error) {
                reject(error);
            } else {
                // console.log('Получение длительности для файла', fileName, '-> duration:', parseFloat(stdout));
                resolve(parseFloat(stdout));
            }
        });
    });
}

exports.getDuration = getDuration;
