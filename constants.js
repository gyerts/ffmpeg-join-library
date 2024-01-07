const { join } = require('path');
const { Settings } = require("./scripts/settings");

const cwd = process.cwd();

const PATH_TO_APP_LOGS = join(cwd, 'app-logs', 'dist', 'app-logs', 'browser', 'assets');
const FF_MPEG = `${join(cwd, 'scripts', 'ffmpeg')} -y`;
const FF_PROBE = join(cwd, 'scripts', 'ffprobe');
const DB_PATH = '/Users/gyerts/WebstormProjects/libraries/holy-editor/database-backup';
const DB_AUDIO = join(DB_PATH, 'uploaded-audios');
const DB_VIDEO = join(DB_PATH, 'uploaded-videos');
const DB_IMAGE = join(DB_PATH, 'uploaded-images');
const OUT_FOLDER = join(PATH_TO_APP_LOGS, 'out');
const DIST_FOLDER = join(OUT_FOLDER, 'artifacts');
const PATH_TO_APP_LOGS_FILE = join(PATH_TO_APP_LOGS, 'logs.json');

console.log({
    FF_MPEG,
    FF_PROBE,
    DB_PATH,
    DB_AUDIO,
    DB_VIDEO,
    OUT_FOLDER,
    DIST_FOLDER,
    PATH_TO_APP_LOGS_FILE,
})

const resolution = '3024:1888';

const mediaObjects = [
    'autoplay-audio-plus-video',
    'page-in-page',
    'generate-audio-revoicer',
    'video',
    'image',
];

const settings = new Settings(OUT_FOLDER);

exports.FF_MPEG = FF_MPEG;
exports.FF_PROBE = FF_PROBE;
exports.DB_PATH = DB_PATH;
exports.DB_AUDIO = DB_AUDIO;
exports.DB_VIDEO = DB_VIDEO;
exports.DB_IMAGE = DB_IMAGE;
exports.DIST_FOLDER = DIST_FOLDER;
exports.OUT_FOLDER = OUT_FOLDER;
exports.PATH_TO_APP_LOGS_FILE = PATH_TO_APP_LOGS_FILE;

exports.mediaObjects = mediaObjects;
exports.resolution = resolution;
exports.settings = settings;
