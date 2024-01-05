async function responseToContent(res) {
    return JSON.parse((await res.json()).content);
}

exports.responseToContent = responseToContent;
