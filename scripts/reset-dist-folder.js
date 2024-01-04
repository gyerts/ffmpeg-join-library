const fs = require('fs');
const {DIST_FOLDER} = require("../constants");

function resetDistFolder() {
    fs.rmSync(DIST_FOLDER, { recursive: true });
    fs.mkdirSync(DIST_FOLDER);
}

exports.resetDistFolder = resetDistFolder;
