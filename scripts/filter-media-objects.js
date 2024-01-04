const {mediaObjects} = require("../constants");
const {getArticle} = require("./get-article");

async function filterMediaObjects(url) {
    const contentItems = await getArticle(url);
    return contentItems.filter(i => mediaObjects.includes(i.componentType));
}

exports.filterMediaObjects = filterMediaObjects;
