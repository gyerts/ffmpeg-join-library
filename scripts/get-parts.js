const {fetchArticle} = require("./get-article");
const {mediaObjects} = require("../constants");

async function getParts(url) {
    const parts = [];

    const mediaObjectsSkip = mediaObjects.filter(i => i !== 'autoplay-audio-plus-video');

    async function construct (contentItems, skipAutoplayItem) {
        const allowed = skipAutoplayItem ? mediaObjectsSkip : mediaObjects;

        contentItems = contentItems.filter(i => allowed.includes(i.componentType));

        let part = [];

        for (let i = 0; i < contentItems.length; i++) {
            const item = contentItems[i];

            if (item.componentType === 'page-in-page') {
                parts.push(part);
                part = [];
                const contentItems = await fetchArticle(`api/articles/url?url=${item.data.url}`);
                await construct(contentItems, true);
            } else {
                part.push(item);
            }
        }

        parts.push(part);
    }

    await construct(await fetchArticle(url));
    return parts.filter(p => p.length >= 1);
}

exports.getParts = getParts;
