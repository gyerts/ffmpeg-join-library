const fs = require('fs');
const {ASSETS_FOLDER} = require("./constants");

function resetAssetsFolder() {
    fs.rmSync(ASSETS_FOLDER, { recursive: true });
}
