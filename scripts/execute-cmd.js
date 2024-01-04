const exec = require('child_process').exec;

function executeCmd(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.error(`Ошибка выполнения команды: ${error}`);
                reject(error);
            } else {
                resolve(stdout ? stdout : stderr);
            }
        });
    });
}

exports.executeCmd = executeCmd;
