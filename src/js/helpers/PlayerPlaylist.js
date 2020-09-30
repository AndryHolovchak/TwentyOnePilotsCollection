const { IdGenerator } = require("../utils/IdGenerator");
import { shuffleArray } from "../utils/ArrayUtils.js";

class PlayerPlaylist {
  constructor(
    id = IdGenerator.generate(),
    songsInfo = [],
    initialSongIndex = 0
  ) {
    this._originalOrder = songsInfo.slice();
    this._currentOrder = this._originalOrder.slice();
    this._currentSongIndex = initialSongIndex;
    this._isShuffled = false;
  }

  get isShuffled() {
    return this._isShuffled;
  }

  shuffle() {
    this._changeCurrentOrder(() => shuffleArray(this._currentOrder));
    this._isShuffled = true;
  }

  useOriginalOrder() {
    this._changeCurrentOrder(() => {
      this._currentOrder = this._originalOrder.slice();
    });
    this._isShuffled = false;
  }

  previous() {
    if (this._currentSongIndex == 0) {
      this._currentSongIndex = this._currentOrder.length - 1;
    } else {
      this._currentSongIndex = Math.max(0, this._currentSongIndex - 1);
    }
    return this.current();
  }

  current() {
    return this._currentOrder[this._currentSongIndex] || null;
  }

  next() {
    if (this._currentOrder.length > 0) {
      this._currentSongIndex = Math.max(
        0,
        (this._currentSongIndex + 1) % this._currentOrder.length
      );
    }
    return this.current();
  }

  goToSong(instasnceId) {
    let songIndex = this._getSongIndexIn(this._currentOrder, instasnceId);

    if (songIndex == -1) {
      throw new UnknownSongError();
    }

    this._currentSongIndex = songIndex;

    return this.current();
  }

  getSong(instanceId) {
    return (
      this._currentOrder[
        this._getSongIndexIn(this._currentOrder, instanceId)
      ] || null
    );
  }

  _getSongIndexIn(array, instanceId) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].instanceId === instanceId) {
        return i;
      }
    }
    return -1;
  }

  _changeCurrentOrder(changer) {
    let currentSong = this.current();
    changer();
    this._currentSongIndex = currentSong
      ? this._getSongIndexIn(this._currentOrder, currentSong.instanceId)
      : 0;
  }
}

export { PlayerPlaylist };
