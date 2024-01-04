const {mediaObjects} = require("./constants");

function validate(i, item, nextItem) {
    if (i === 0 && nextItem.componentType !== 'video') {
        throw new Error('First revoicer must have a video');
    }
    if (i === 0 && item.data.pauseBeforePlay) {
        throw new Error('No pauseBeforePlay should exists on first audio');
    }
    if (i === 0 && item.data.pauseBeforePlayVideo) {
        throw new Error('No pauseBeforePlayVideo should exists on first audio');
    }
    if (nextItem &&
        item.componentType === 'generate-audio-revoicer' &&
        !mediaObjects.includes(nextItem.componentType)
    ) {
        throw new Error(`${nextItem.componentType} is not supported`);
    }
}

exports.validate = validate;
