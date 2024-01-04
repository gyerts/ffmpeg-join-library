async function getArticle(url) {
    const res = await fetch(
        `http://0.0.0.0:4201/${url}`);
    return JSON.parse((await res.json()).content);
}

exports.getArticle = getArticle;
