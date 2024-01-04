const fs = require('fs');

function copyFile(src, dest) {
    console.log(`Копирование файла в ${dest}`);
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
