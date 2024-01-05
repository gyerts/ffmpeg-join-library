const { join } = require('path');
const { Settings } = require("./scripts/settings");

const cwd = process.cwd();

const FF_MPEG = `${join(cwd, 'scripts', 'ffmpeg')} -y`;
const FF_PROBE = join(cwd, 'scripts', 'ffprobe');
const DB_PATH = '/Users/gyerts/WebstormProjects/libraries/holy-editor/database-backup';
const DB_AUDIO = join(DB_PATH, 'uploaded-audios');
const DB_VIDEO = join(DB_PATH, 'uploaded-videos');
const OUT_FOLDER = join(cwd, 'out');
const DIST_FOLDER = join(OUT_FOLDER, 'artifacts');
let globalVideoCreated = false;

console.log({
    FF_MPEG,
    FF_PROBE,
    DB_PATH,
    DB_AUDIO,
    DB_VIDEO,
    OUT_FOLDER,
    DIST_FOLDER,
})

const resolution = '3024:1888';

const mediaObjects = [
    'autoplay-audio-plus-video',
    'page-in-page',
    'generate-audio-revoicer',
    'video',
];

const settings = new Settings(OUT_FOLDER);

exports.FF_MPEG = FF_MPEG;
exports.FF_PROBE = FF_PROBE;
exports.DB_PATH = DB_PATH;
exports.DB_AUDIO = DB_AUDIO;
exports.DB_VIDEO = DB_VIDEO;
exports.DIST_FOLDER = DIST_FOLDER;
exports.OUT_FOLDER = OUT_FOLDER;
exports.globalVideoCreated = globalVideoCreated;
exports.mediaObjects = mediaObjects;
exports.resolution = resolution;
exports.settings = settings;
