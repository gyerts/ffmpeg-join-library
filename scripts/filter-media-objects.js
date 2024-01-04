const {mediaObjects} = require("../constants");
const {getArticle} = require("./get-article");

async function filterMediaObjects() {
    const contentItems = await getArticle();
    return contentItems.filter(i => mediaObjects.includes(i.componentType));
}

exports.filterMediaObjects = filterMediaObjects;
