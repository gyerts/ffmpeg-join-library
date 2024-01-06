const fs = require('fs');
const {PATH_TO_APP_LOGS_FILE} = require("../constants");

function initAppLogs() {
    fs.writeFileSync(PATH_TO_APP_LOGS_FILE, JSON.stringify({
        audios: [],
        videos: [],
    }, null, 2));
}

exports.initAppLogs = initAppLogs;
