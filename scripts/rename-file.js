const fs = require('fs');

function renameFile(oldPath, newPath) {
    return new Promise((resolve, reject) => {
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.error(`Ошибка при переименовании файла: ${err}`);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

exports.renameFile = renameFile;
