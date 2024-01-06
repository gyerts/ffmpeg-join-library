const { join } = require('path');
const {getVideoResolution} = require("./get-video-resolution");
const {FF_MPEG, DIST_FOLDER, resolution} = require("../constants");
const {executeCmd} = require("./execute-cmd");
const {getNameFromPath} = require("./get-name-from-path");
const {logIt} = require("./log");


async function makeVideoFromSpriteImage(spritePath, cols, total, ms = 100) {
    const [w, h] = (await getVideoResolution(spritePath)).split(':').map(i => +i);

    const crops = [];

    const _rowsFloat = total/cols;
    const rows = _rowsFloat - Math.floor(_rowsFloat) === 0 ? _rowsFloat : Math.floor(_rowsFloat)+1;

    const iW = w/cols;
    const iH = h/rows;

    logIt(spritePath, "Make video from sprite", {cols, rows, total, ms}, { w, h }, { iW, iH });

    const spriteName = getNameFromPath(spritePath);

    for (let i = 0, iterations = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++, iterations++) {
            if (iterations < total) {
                const framePath = join(DIST_FOLDER, `${spriteName}-frame-${iterations}.png`);
                crops.push(`-i ${spritePath} -vf "crop=${iW}:${iH}:${iW*j}:${iH*i}" ${framePath}`);
            }
        }
    }

    const makeFramesCMD = `${FF_MPEG} ${crops.join(' ')}`;
    await executeCmd(makeFramesCMD);

    const duration = total * (ms / 1000);
    const outputFile = join(DIST_FOLDER, `${spriteName}.mp4`);
    const framesPattern = join(DIST_FOLDER, `${spriteName}-frame-%d.png`);
    const makeVideoCMD = `${FF_MPEG} -framerate 10 -i ${framesPattern} -vf "scale=${resolution},setsar=1:1" -c:v libx264 -t ${duration} ${outputFile}`;
    await executeCmd(makeVideoCMD);

    return outputFile;
}

exports.makeVideoFromSpriteImage = makeVideoFromSpriteImage;
