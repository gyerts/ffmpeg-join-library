const {responseToContent} = require("./response-to-content");
const host = 'http://0.0.0.0:4201';

async function fetchArticle(url) {
    const articleUrl = `${host}/${url}`;
    const COLOR = '\033[0;31m';
    const RESET = '\033[0m';
    console.log(`${COLOR}Fetch article:${RESET}`, articleUrl);
    const res = await fetch(articleUrl);
    return await responseToContent(res);
}

exports.fetchArticle = fetchArticle;

// {
//   "key": 1699877568726,
//   "componentType": "image",
//   "data": {
//     "options": {
//       "imageHeight": 300,
//       "imageAlt": "app_1_1",
//       "altPosition": "none",
//       "altColor": "black",
//       "imageAlign": "center",
//       "frames": "5",
//       "cols": "3"
//     },
//     "aspectRatio": {
//       "height": 1964,
//       "width": 4536
//     },
//     "fileUrl": "/api/images/app-1-1.png?location=angular/plugins/obschaya-informatsiya-pro-plagini/zachem-nuzhni-plagini/paper-work-intro/app-1"
//   },
//   "i": 5
// }