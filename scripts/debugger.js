const fs = require('fs');
const {PATH_TO_APP_LOGS_FILE} = require("../constants");

function addAudioToFrontendLogs(name, duration, videoPath) {
    const text = fs.readFileSync(PATH_TO_APP_LOGS_FILE, { encoding: "utf8" });
    const obj = JSON.parse(text);

    obj.audios.push({ name, duration, videoPath });

    fs.writeFileSync(PATH_TO_APP_LOGS_FILE, JSON.stringify(obj, null, 2));
}

function addVideoToFrontendLogs(name, duration) {
    const text = fs.readFileSync(PATH_TO_APP_LOGS_FILE, { encoding: "utf8" });
    const obj = JSON.parse(text);

    obj.videos.push({ name, duration });

    fs.writeFileSync(PATH_TO_APP_LOGS_FILE, JSON.stringify(obj, null, 2));
}

function addMainVideo(name, duration) {
    const text = fs.readFileSync(PATH_TO_APP_LOGS_FILE, { encoding: "utf8" });
    const obj = JSON.parse(text);

    obj.mainVideo = name;

    fs.writeFileSync(PATH_TO_APP_LOGS_FILE, JSON.stringify(obj, null, 2));
}

function setLoading(msg) {
    const text = fs.readFileSync(PATH_TO_APP_LOGS_FILE, { encoding: "utf8" });
    const obj = JSON.parse(text);

    obj.loading = msg;

    fs.writeFileSync(PATH_TO_APP_LOGS_FILE, JSON.stringify(obj, null, 2));
}


exports.addAudioToFrontendLogs = addAudioToFrontendLogs;
exports.addVideoToFrontendLogs = addVideoToFrontendLogs;
exports.addMainVideo = addMainVideo;
exports.setLoading = setLoading;
