const {FIELD_TAGS, HEADER_TAGS} = require('./definitions');

class BufferHelper {
  /**
   * Parses chunks from a Buffer
   *
   * @static
   * @param {Buffer} buffer
   * @param {number} cursor
   * @param {number} end
   * @returns {object}
   * @memberof BufferHelper
   */
  static async parseChunkArray(buffer, cursor, end) {
    let chunks = {};

    while (cursor < end) {
      const parsedChunk = await BufferHelper.parseChunk(buffer, cursor);
      chunks = {...chunks, ...parsedChunk};
      cursor += buffer.readUInt32BE(cursor + 4) + 8;
    }

    return chunks;
  };

  /**
   * Parses a single chunk in a Buffer
   *
   * @static
   * @param {Buffer} buffer
   * @param {number} index
   * @returns {object}
   * @memberof BufferHelper
   */
  static async parseChunk(buffer, index) {
    const tag = BufferHelper.getStringFromUInt32(buffer.readUInt32BE(index));
    const length = buffer.readUInt32BE(index + 4);

    switch (tag) {
      case HEADER_TAGS.OSES:
      case HEADER_TAGS.OENT:
      case HEADER_TAGS.OTRK:
      case HEADER_TAGS.ADAT:
        return {[`song-${index}`]: await BufferHelper.parseChunkArray(buffer, index + 16, index + 8 + length)};
      case FIELD_TAGS.BPM:
        return {bpm: buffer.readUInt32BE(index + 8)};
      case FIELD_TAGS.DATE:
        const secondsSince1970 = buffer.readUInt32BE(index + 12);
        const date = new Date(0);
        date.setUTCSeconds(secondsSince1970);
        return {date};
      case FIELD_TAGS.DURATION:
        return {duration: buffer.readUInt32BE(index + 12)};
      case FIELD_TAGS.NOTES:
        return {notes: BufferHelper.readString(buffer, index, length)};
      case FIELD_TAGS.KEY:
        return {key: BufferHelper.readString(buffer, index, length)};
      case FIELD_TAGS.DECK:
        return {deck: BufferHelper.readString(buffer, index, length)};
      case FIELD_TAGS.ALBUM:
        return {album: BufferHelper.readString(buffer, index, length)};
      case FIELD_TAGS.GENRE:
        return {genre: BufferHelper.readString(buffer, index, length)};
      case FIELD_TAGS.FILE_PATH:
        return {filePath: BufferHelper.readString(buffer, index, length)};
      case FIELD_TAGS.TITLE:
        return {title: BufferHelper.readString(buffer, index, length)};
      case FIELD_TAGS.ARTIST:
        return {artist: BufferHelper.readString(buffer, index, length)};
      case FIELD_TAGS.COMMENT:
        return {comment: BufferHelper.readString(buffer, index, length)};
      case FIELD_TAGS.GROUPING:
        return {grouping: BufferHelper.readString(buffer, index, length)};
      case FIELD_TAGS.REMIXER:
        return {remixer: BufferHelper.readString(buffer, index, length)};
      case FIELD_TAGS.LABEL:
        return {label: BufferHelper.readString(buffer, index, length)};
      case FIELD_TAGS.COMPOSER:
        return {composer: BufferHelper.readString(buffer, index, length)};
      case FIELD_TAGS.YEAR:
        return {year: parseInt(BufferHelper.readString(buffer, index, length))};
      default:
        return {[tag]: BufferHelper.readString(buffer, index, length)};
    }
  };

  /**
   * Reads a string from a Buffer at a given position
   *
   * @static
   * @param {Buffer} buffer
   * @param {number} index
   * @param {number} length
   * @returns {string}
   * @memberof BufferHelper
   */
  static readString(buffer, index, length) {
    return buffer.toString('utf8', index + 8, index + 8 + length).replace(/\0/g, '');
  }

  /**
   * Reads a string from a UInt32
   *
   * @static
   * @param {number} n
   * @returns {string}
   * @memberof BufferHelper
   */
  static getStringFromUInt32(n) {
    return (
      String.fromCharCode(Math.floor(n / (1 << 24)) % 256) +
      String.fromCharCode(Math.floor(n / (1 << 16)) % 256) +
      String.fromCharCode(Math.floor(n / (1 << 8)) % 256) +
      String.fromCharCode(Math.floor(n) % 256)
    );
  }
}

module.exports = BufferHelper;