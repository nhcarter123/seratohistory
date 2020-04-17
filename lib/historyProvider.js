const path = require('path');
const fs = require('fs');
const os = require('os');
const {keys, pick, zipObject} = require('lodash');
const {SERATO_HISTORY_FOLDER, SERATO_MUSIC_FOLDER, HISTORY_FIELDS} = require('./definitions');
const BufferHelper = require('./bufferHelper');
const {HEADER_TAGS} = require('./definitions');

class HistoryProvider {
  /**
   * Gets the history given the path to the Serato music folder
   *
   * @static
   * @param {string} seratoPath
   * @returns {object}
   * @memberof HistoryProvider
   */
  static async getHistory(seratoPath) {
    const sessionNames = fs
      .readdirSync(path.join(seratoPath, SERATO_HISTORY_FOLDER))
      .map(sessionName => path.join(seratoPath, SERATO_HISTORY_FOLDER, sessionName));

    return zipObject(sessionNames, await Promise.all(sessionNames.map(HistoryProvider.getSessionSongs)));
  };

  /**
   * Gets all songs within a .session file
   *
   * @static
   * @param {string} sessionPath
   * @returns {[object]}
   * @memberof HistoryProvider
   */
  static async getSessionSongs(sessionPath) {
    const buffer = await fs.promises.readFile(sessionPath);

    const parsedSession = await BufferHelper.parseChunkArray(buffer, 0, buffer.length);

    return keys(parsedSession)
      .filter(key => key !== HEADER_TAGS.VERSION)
      .map(key => pick(parsedSession[key], HISTORY_FIELDS));
  };

  /**
   * Gets the path of the Serato music folder
   *
   * @static
   * @returns {string}
   * @memberof HistoryProvider
   */
  static getDefaultSeratoPath() {
    return path.join(os.homedir(), SERATO_MUSIC_FOLDER);
  };
}

module.exports = HistoryProvider;