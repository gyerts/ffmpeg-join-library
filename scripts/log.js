function logIt(filePath, ...args) {
    const COLOR = '\033[0;37m';
    const RESET = '\033[0m';
    console.log(`\n${COLOR}[${filePath.split('/').pop()}]${RESET}\n  `, ...args);
}

exports.logIt = logIt;
