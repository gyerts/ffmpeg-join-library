const {executeCmd} = require("./execute-cmd");
const {FF_PROBE} = require("./constants");

async function getVideoResolution(filePath) {
    const output = await executeCmd(
        `${FF_PROBE} -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 ${filePath}`
    );
    return output.replace(',', ':').trim();
}

exports.getVideoResolution = getVideoResolution;
