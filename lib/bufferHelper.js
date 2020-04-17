const { TAG } = require('./definitions');

class BufferHelper {
  static async parseChunkArray(buffer, cursor, end) {
    let chunks = {};

    while (cursor < end) {
      const parsedChunk = await BufferHelper.parseChunk(buffer, cursor);
      chunks = {...chunks, ...parsedChunk};
      cursor += buffer.readUInt32BE(cursor + 4) + 8;
    }

    return chunks;
  };

  static async parseChunk(buffer, index) {
    const tag = BufferHelper.getStringFromUInt32(buffer.readUInt32BE(index));
    const length = buffer.readUInt32BE(index + 4);

    switch (tag) {
      case 'oses':
      case 'oent':
      case 'otrk':
      case 'adat':
        return {[`song-${index}`]: await BufferHelper.parseChunkArray(buffer, index + 16, index + 8 + length)};
      case TAG.BPM:
        return {bpm: buffer.readUInt32BE(index + 8)};
      case TAG.DATE:
        const secondsSince1970 = buffer.readUInt32BE(index + 12);
        const date = new Date(0);
        date.setUTCSeconds(secondsSince1970);
        return {date};
      case TAG.DURATION:
        return {duration: buffer.readUInt32BE(index + 12)};
      case TAG.NOTES:
        return {notes: BufferHelper.readString(buffer, index, length)};
      case TAG.KEY:
        return {key: BufferHelper.readString(buffer, index, length)};
      case TAG.DECK:
        return {deck: BufferHelper.readString(buffer, index, length)};
      case TAG.ALBUM:
        return {album: BufferHelper.readString(buffer, index, length)};
      case TAG.GENRE:
        return {genre: BufferHelper.readString(buffer, index, length)};
      case TAG.FILE_PATH:
        return {filePath: BufferHelper.readString(buffer, index, length)};
      case TAG.TITLE:
        return {title: BufferHelper.readString(buffer, index, length)};
      case TAG.ARTIST:
        return {artist: BufferHelper.readString(buffer, index, length)};
      case TAG.COMMENT:
        return {comment: BufferHelper.readString(buffer, index, length)};
      case TAG.GROUPING:
        return {grouping: BufferHelper.readString(buffer, index, length)};
      case TAG.REMIXER:
        return {remixer: BufferHelper.readString(buffer, index, length)};
      case TAG.LABEL:
        return {label: BufferHelper.readString(buffer, index, length)};
      case TAG.COMPOSER:
        return {composer: BufferHelper.readString(buffer, index, length)};
      case TAG.YEAR:
        return {year: parseInt(BufferHelper.readString(buffer, index, length))};
      default:
        return {[tag]: BufferHelper.readString(buffer, index, length)};
    }
  };

  static readString(buffer, index, length) {
    return buffer.toString('latin1', index + 8, index + 8 + length).replace(/\0/g, ''); //todo check this
  }

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