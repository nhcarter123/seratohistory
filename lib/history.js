const Promise = require('bluebird');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { keys, pick, zipObject } = require('lodash');
const { SERATO_HISTORY_FOLDER, SERATO_MUSIC_FOLDER, HISTORY_FIELDS} = require('./definitions');
const BufferHelper = require('./bufferHelper');

const getSeratoHistory = async seratoPath => {
    const sessionNames = fs
        .readdirSync(path.join(seratoPath, SERATO_HISTORY_FOLDER))
        .map(sessionName => path.join(seratoPath, SERATO_HISTORY_FOLDER, sessionName));

    return zipObject(sessionNames, await Promise.map(sessionNames, getSessionSongs));
};

const getSessionSongs = async sessionPath => {
    const buffer = await fs.promises.readFile(sessionPath);

    const parsedSession = await BufferHelper.parseChunkArray(buffer, 0, buffer.length);

    return keys(parsedSession)
        .filter(key => key !== 'vrsn')
        .map(key => pick(parsedSession[key], HISTORY_FIELDS));
};

const getDefaultSeratoPath = () => path.join(os.homedir(), SERATO_MUSIC_FOLDER);

module.exports = {
    getDefaultSeratoPath,
    getSeratoHistory
};