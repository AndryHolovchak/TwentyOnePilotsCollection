import { bindMethods } from "../utils/BindMethods.js";
import { PlayerPlaylist } from "./PlayerPlaylist.js";
import { ExtendedEvent } from "./ExtendedEvent.js";
import { UrlProvider } from "../utils/UrlProvider.js";

class Player {
  _isRepeatOneModeOn = false;
  _isShuffleModeOn = false;
  _isMetadataLoaded = false;
  _currentSong = null;

  constructor() {
    this._playlist = new PlayerPlaylist();
    this._htmlAudio = new Audio();

    this._onSongChange = new ExtendedEvent();
    this._onTogglePlay = new ExtendedEvent();

    bindMethods(this, [
      "_handleHtmlAudioPause",
      "_handleHtmlAudioPlay",
      "_handleHtmlAudioEnded",
      "_handleLoadedMetadata",
    ]);

    this._htmlAudio.addEventListener("pause", this._handleHtmlAudioPause);
    this._htmlAudio.addEventListener("play", this._handleHtmlAudioPlay);
    this._htmlAudio.addEventListener("ended", this._handleHtmlAudioEnded);
    this._htmlAudio.addEventListener(
      "loadedmetadata",
      this._handleLoadedMetadata
    );
  }

  get currentSong() {
    return this._currentSong;
  }

  get isShuffleModeOn() {
    return this._isShuffleModeOn;
  }

  get isRepeatOneModeOn() {
    return this._isRepeatOneModeOn;
  }

  get isMetadataLoaded() {
    return this._isMetadataLoaded;
  }

  get playlistId() {
    return this._playlist.id;
  }

  get duration() {
    return this._currentSong && this._isMetadataLoaded
      ? this._htmlAudio.duration
      : 0;
  }

  get progress() {
    let duration = this.duration;
    return duration && this.currentTime / duration;
  }

  set progress(percent) {
    if (this._isMetadataLoaded) {
      this._htmlAudio.currentTime = this._htmlAudio.duration * percent;
    }
  }

  get currentTime() {
    return this._htmlAudio.currentTime;
  }

  addOnSongChangeListener(callback) {
    this._onSongChange.addListener(callback);
  }

  removeOnSongChangeListener(callback) {
    this._onSongChange.removeListener(callback);
  }

  addOnTogglePlayListener(callback) {
    this._onTogglePlay.addListener(callback);
  }

  removeOnTogglePlayListener(callback) {
    this._onTogglePlay.removeListener(callback);
  }

  isCurrentSong(songInfo) {
    return !!(
      this._currentSong &&
      songInfo &&
      this._currentSong.instanceId == songInfo.instanceId
    );
  }

  isInPlaylist(songInfo) {
    return songInfo && !!this._playlist.getSong(songInfo.instanceId);
  }

  togglePlay() {
    this._setHtmlAudioPlay(!this.isPlaying());
  }

  toggleRepeatOneMode() {
    this._isRepeatOneModeOn = !this._isRepeatOneModeOn;
  }

  toggleShuffleMode() {
    this._isShuffleModeOn
      ? this._playlist.useOriginalOrder()
      : this._playlist.shuffle();

    this._isShuffleModeOn = !this._isShuffleModeOn;
  }

  playPrevious() {
    if (this.currentTime >= 5) {
      this._htmlAudio.currentTime = 0;
    } else {
      this._playSong(this._playlist.previous());
    }
  }

  replayCurrent() {
    this._playSong(this._currentSong);
  }

  playNext() {
    this._playSong(this._playlist.next());
  }

  createNewPlaylist(songsInfo, id, initialSongIndex) {
    this._playlist = new PlayerPlaylist(id, songsInfo, initialSongIndex);

    if (this._isShuffleModeOn) {
      this._playlist.shuffle();
    }
  }

  playFromPlaylist(songInfo) {
    this._playSong(this._playlist.goToSong(songInfo.instanceId));
  }

  isPlaying() {
    return !!(this._currentSong && !this._htmlAudio.paused);
  }

  _playSong(songInfo) {
    this._currentSong = songInfo;

    if (this._currentSong) {
      this._isMetadataLoaded = false;
      this._htmlAudio.src = UrlProvider.getUrlToMp3(this._currentSong.id);
      this._setHtmlAudioPlay(true);
    } else {
      this._isMetadataLoaded = true;
      this._htmlAudio.src = "";
      this._setHtmlAudioPlay(false);
    }
    this._onSongChange.trigger(null, this._currentSong);
  }

  async _setHtmlAudioPlay(isPlaying) {
    !!(this._currentSong && isPlaying)
      ? // catches
        //"The play()request was interrupted by a (call to pause())/(new load reques)" Error
        this._htmlAudio.play().catch(() => {})
      : this._htmlAudio.pause();
  }

  _handleLoadedMetadata() {
    this._isMetadataLoaded = true;
  }

  _handleHtmlAudioPause() {
    this._onTogglePlay.trigger(null, false);
  }

  _handleHtmlAudioPlay() {
    this._onTogglePlay.trigger(null, true);
  }

  _handleHtmlAudioEnded() {
    if (this._isRepeatOneModeOn) {
      this.replayCurrent();
    } else {
      this.playNext();
    }
  }

  _handleHtmlAudioEmptied() {
    this._onSongChange(null);
  }
}

let instance = new Player();
export { instance };
