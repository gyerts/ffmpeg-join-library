const fs = require('fs');
const {DIST_FOLDER, OUT_FOLDER} = require("../constants");

function resetDistFolder() {
    try {
        fs.rmSync(DIST_FOLDER, { recursive: true });
    } catch {
    }

    try {
        fs.mkdirSync(OUT_FOLDER);
    } catch {}

    fs.mkdirSync(DIST_FOLDER);
}

exports.resetDistFolder = resetDistFolder;
