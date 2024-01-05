const {mediaObjects} = require("../constants");

function validate(i, item, nextItem) {
    let startIndex = 0;

    if (i === 0 && item.componentType === 'autoplay-audio-plus-video') {
        startIndex = 1;
    }

    if (i === startIndex && nextItem.componentType !== 'video') {
        throw new Error('First revoicer must have a video');
    }
    if (i === startIndex && item.data.pauseBeforePlay) {
        throw new Error('No pauseBeforePlay should exists on first audio');
    }
    if (i === startIndex && item.data.pauseBeforePlayVideo) {
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
