const { join } = require('path');

const FF_MPEG = `${join('scripts', 'ffmpeg')} -y`;
const FF_PROBE = join('scripts', 'ffprobe');
const DB_PATH = '/Users/gyerts/WebstormProjects/libraries/holy-editor/database-backup';
const DB_AUDIO = join(DB_PATH, 'uploaded-audios');
const DB_VIDEO = join(DB_PATH, 'uploaded-videos');
const OUT_FOLDER = join('out');
const DIST_FOLDER = join(OUT_FOLDER, 'artifacts');
let globalVideoCreated = false;

const MAIN_AUDIO_PATH = join(DIST_FOLDER, 'main-audio.wav');
const MERGE_AUDIO_PATH = join(DIST_FOLDER, 'audio-merge.txt');

const MAIN_VIDEO_PATH = join(DIST_FOLDER, 'main-video.mp4');
const MERGE_VIDEO_PATH = join(DIST_FOLDER, 'video-merge.txt');
const resolution = '3024:1888';

const MAIN_VIDEO_NAME = join(OUT_FOLDER, 'output.mp4');

const mediaObjects = [
    'generate-audio-revoicer',
    'video',
];

const VideoFiles = []

exports.FF_MPEG = FF_MPEG;
exports.FF_PROBE = FF_PROBE;
exports.DB_PATH = DB_PATH;
exports.DB_AUDIO = DB_AUDIO;
exports.DB_VIDEO = DB_VIDEO;
exports.DIST_FOLDER = DIST_FOLDER;
exports.OUT_FOLDER = OUT_FOLDER;
exports.globalVideoCreated = globalVideoCreated;
exports.MAIN_VIDEO_NAME = MAIN_VIDEO_NAME;
exports.MAIN_AUDIO_PATH = MAIN_AUDIO_PATH;
exports.MERGE_AUDIO_PATH = MERGE_AUDIO_PATH;
exports.MAIN_VIDEO_PATH = MAIN_VIDEO_PATH;
exports.MERGE_VIDEO_PATH = MERGE_VIDEO_PATH;
exports.mediaObjects = mediaObjects;
exports.VideoFiles = VideoFiles;
exports.resolution = resolution;
