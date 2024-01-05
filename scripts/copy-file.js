const fs = require('fs');
const {logIt} = require("./log");

function copyFile(src, dest) {
    logIt(dest, 'Копирование файла');
    return new Promise((resolve, reject) => {
        fs.copyFile(src, dest, (err) => {
            if (err) {
                console.error(`Ошибка при копировании файла: ${err}`);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

exports.copyFile = copyFile;
