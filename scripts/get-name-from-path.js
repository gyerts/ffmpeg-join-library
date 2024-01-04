const { sep } = require('path');

function getNameFromPath(filePath) {
    return filePath.split(sep).pop();
}

exports.getNameFromPath = getNameFromPath;
