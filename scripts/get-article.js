const url = 'api/articles/url?url=angular/micro-and-macro-tasks/primer-3_eng';

async function getArticle() {
    const res = await fetch(
        `http://0.0.0.0:4201/${url}`);
    return JSON.parse((await res.json()).content);
}

exports.getArticle = getArticle;
