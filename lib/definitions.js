const SERATO_MUSIC_FOLDER = 'Music/_Serato_/';
const SERATO_HISTORY_FOLDER = 'History/Sessions';
const HISTORY_FIELDS = [
    'title',
    'artist',
    'bpm',
    'key',
    'filePath',
    'duration',
    'deck',
    'notes',
    'album',
    'genre',
    'comment',
    'grouping',
    'remixer',
    'label',
    'composer',
    'year',
];
const TAG = {
    FILE_PATH: '\u0000\u0000\u0000\u0002',
    COMPOSER: '\u0000\u0000\u0000\u0016',
    GROUPING: '\u0000\u0000\u0000\u0013',
    COMMENT: '\u0000\u0000\u0000\u0011',
    REMIXER: '\u0000\u0000\u0000\u0014',
    ARTIST: '\u0000\u0000\u0000\u0007',
    TITLE: '\u0000\u0000\u0000\u0006',
    LABEL: '\u0000\u0000\u0000\u0015',
    YEAR: '\u0000\u0000\u0000\u0017',
    BPM: '\u0000\u0000\u0000\u000f',
    DURATION: '\u0000\u0000\u0000-',
    ALBUM: '\u0000\u0000\u0000\b',
    GENRE: '\u0000\u0000\u0000\t',
    NOTES: '\u0000\u0000\u00001',
    DATE: '\u0000\u0000\u00005',
    DECK: '\u0000\u0000\u0000?',
    KEY: '\u0000\u0000\u00003',
};

module.exports = {
    SERATO_HISTORY_FOLDER,
    SERATO_MUSIC_FOLDER,
    HISTORY_FIELDS,
    TAG
};