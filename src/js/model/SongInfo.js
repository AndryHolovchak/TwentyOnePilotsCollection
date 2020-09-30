const { IdGenerator } = require("../utils/IdGenerator");

class SongInfo {
  constructor(songInfoJson, albumId, accentColor) {
    this.title = songInfoJson.title;
    this.id = songInfoJson.id;
    this.accentColor = accentColor;
    this.albumId = albumId;
    this.instanceId = IdGenerator.generate();
  }
}

export { SongInfo };
