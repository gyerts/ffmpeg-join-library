function logIt(filePath, ...args) {
    console.log(`[${filePath.split('/').pop()}]`, ...args);
}

exports.logIt = logIt;
