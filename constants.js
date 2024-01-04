const { join } = require('path');

const FF_MPEG = './scripts/ffmpeg -y';
const FF_PROBE = './scripts/ffprobe';
const DB_PATH = '/Users/gyerts/WebstormProjects/libraries/holy-editor/database-backup';
const DB_AUDIO = join(DB_PATH, 'uploaded-audios');
const DB_VIDEO = join(DB_PATH, 'uploaded-videos');
const DIST_FOLDER = './dist';
let globalVideoCreated = false;

const MAIN_AUDIO_PATH = `${DIST_FOLDER}/main-audio.wav`;
const MERGE_AUDIO_PATH = `${DIST_FOLDER}/audio-merge.txt`;

const MAIN_VIDEO_PATH = `${DIST_FOLDER}/main-video.mp4`;
const MERGE_VIDEO_PATH = `${DIST_FOLDER}/video-merge.txt`;
const resolution = '3024:1888';

// Только одно видео может быть активно в момент калькуляций какое аудио куда вставлять,
// для одного видео может быть выполнено слияние одного или нескольких аудио.
// Потому мы запоминаем с каким видео мы работаем, для того чтобы ссылаться на него позднее.
const GLOBAL_VIDEO_PATH = 'output.mov';

// Этот путь будет использован для перезаписи видео из `GLOBAL_VIDEO_PATH`,
// в `TEMP_VIDEO_PATH` будут лежать все промежуточные версии `GLOBAL_VIDEO_PATH`.
const TEMP_VIDEO_PATH = 'temp-output.mov';

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
exports.globalVideoCreated = globalVideoCreated;
exports.GLOBAL_VIDEO_PATH = GLOBAL_VIDEO_PATH;
exports.TEMP_VIDEO_PATH = TEMP_VIDEO_PATH;
exports.MAIN_AUDIO_PATH = MAIN_AUDIO_PATH;
exports.MERGE_AUDIO_PATH = MERGE_AUDIO_PATH;
exports.MAIN_VIDEO_PATH = MAIN_VIDEO_PATH;
exports.MERGE_VIDEO_PATH = MERGE_VIDEO_PATH;
exports.mediaObjects = mediaObjects;
exports.VideoFiles = VideoFiles;
exports.resolution = resolution;
