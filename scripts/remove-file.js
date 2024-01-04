const fs = require('fs');

function removeFile(filePath) {
    fs.unlinkSync(filePath);
}

exports.removeFile = removeFile;
