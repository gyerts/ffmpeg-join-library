const { join } = require('path');

function getArticleFilePath(DB, fileUrl) {
    const [urlApi, urlLocation] = fileUrl.split('?');
    const fileName = urlApi.split('/').pop();
    const location = urlLocation.split('=').pop();
    return join(DB, location, fileName);
}

exports.getArticleFilePath = getArticleFilePath;
