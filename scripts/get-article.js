const {responseToContent} = require("./response-to-content");
const host = 'http://0.0.0.0:4201';

async function fetchArticle(url) {
    const res = await fetch(`${host}/${url}`);
    return await responseToContent(res);
}

exports.fetchArticle = fetchArticle;
