const {join} = require("path");
const {mergeVideoAndAudio} = require("./scripts/merge-video-and-audio");
const {resetDistFolder} = require("./scripts/reset-dist-folder");
const {runAudio} = require("./scripts/run-audio");
const {runVideo} = require("./scripts/run-video");
const {mergeVideos} = require("./scripts/merge-videos");
const {getParts} = require("./scripts/get-parts");
const {DIST_FOLDER, settings} = require("./constants");
const {logIt} = require("./scripts/log");
const {mergeAllVideos} = require("./scripts/merge-all-videos");


const url = 'api/articles/url?url=angular/micro-and-macro-tasks/micro-and-macro-tasks-eng-version';

(async () => {
    resetDistFolder();

    let parts = await getParts(url);
    const videos = [];

    console.log(parts.map(p => p.map(i => i.componentType)));

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        const audioFileName = join(DIST_FOLDER, `part-audio-${i}.mp3`);
        const videoFileName = join(DIST_FOLDER, `part-video-${i}.mp4`);
        const mainVideoName = join(DIST_FOLDER, `part-${i}.mp4`);

        await runAudio(part, audioFileName, i);
        await runVideo(part, videoFileName);
        await mergeVideoAndAudio(videoFileName, audioFileName, mainVideoName);
        videos.push(mainVideoName);
    }

    await mergeAllVideos(videos);
})();
