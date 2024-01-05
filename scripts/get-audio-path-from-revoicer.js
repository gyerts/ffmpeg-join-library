const {getArticleFilePath} = require("./get-article-file-path");
const {DB_AUDIO} = require("../constants");

function getAudioPathFromRevoicer(item) {
    // if used Revoicer for audio than use revoicer object, otherwise user record object
    if (item.data.generateRevoicer) {
        return {
            fileUrl: getArticleFilePath(DB_AUDIO, item.data.audioRevoicer.fileUrl),
            duration: item.data.audioRevoicer.duration,
        };
    } else {
        return {
            fileUrl: getArticleFilePath(DB_AUDIO, item.data.audioRecord.fileUrl),
            duration: item.data.audioRecord.duration,
        };
    }
}

function isValidRevoicer(item) {
    try {
        getAudioPathFromRevoicer(item);
        return true;
    } catch {
        return false;
    }
}


exports.getAudioPathFromRevoicer = getAudioPathFromRevoicer;
exports.isValidRevoicer = isValidRevoicer;
