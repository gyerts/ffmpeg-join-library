const { join } = require('path');
const {executeCmd} = require("./execute-cmd");
const {FF_MPEG, DIST_FOLDER} = require("../constants");
const {removeFile} = require("./remove-file");
const {getVideoResolution} = require("./get-video-resolution");
const {getNameFromPath} = require("./get-name-from-path");

async function generateVideoFromLastFrame(filePath, duration) {
    const fileName = getNameFromPath(filePath);
    const frameVideoName = join(DIST_FOLDER, `frozen-${fileName}`);
    const frameName = join(DIST_FOLDER, `frozen-${fileName}.png`)
        .replace(`.${frameVideoName.split('.').pop()}`, '',);

    await executeCmd(`${FF_MPEG} -sseof -0.1 -i ${filePath} -vsync 0 -q:v 31 -update true ${frameName}`);
    const resolution = await getVideoResolution(filePath);
    await executeCmd(`${FF_MPEG} -loop 1 -i ${frameName} -c:v libx264 -t ${duration} -pix_fmt yuv420p -vf "scale=${resolution}" ${frameVideoName}`);
    removeFile(frameName);
    return frameVideoName;
}

exports.generateVideoFromLastFrame = generateVideoFromLastFrame;
