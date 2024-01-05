const { join } = require('path');
const {DIST_FOLDER} = require("../constants");

function getMergeAudioListPath(partIndex) {
    return join(DIST_FOLDER, `merge-audio-${partIndex}.txt`);
}

exports.getMergeAudioListPath = getMergeAudioListPath;
