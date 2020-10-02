import { UrlProvider } from "../utils/UrlProvider.js";
import { instance as player } from "./Player.js";

class MediaSessionManager {
  static __FAKE_AUDIO_SRC = "data/mp3/justAudioFile.mp3";

  constructor() {
    this.supportsMediaSession = "mediaSession" in navigator;
    // _fakeAudio is necessary so that mediaSession does not disappear while changing the tracks
    // We will play fake audio during tracks loading
    this._fakeAudio = new Audio();
    this._fakeAudio.autoplay = false;
    this._fakeAudio.volume = 0;

    this._handlePlayerSongChange = this._handlePlayerSongChange.bind(this);
    this._handlePlayerTogglePause = this._handlePlayerTogglePause.bind(this);
    this._fakeAudio.src = MediaSessionManager.__FAKE_AUDIO_SRC;

    this._fakeAudio.addEventListener(
      "ended",
      () => {
        this._fakeAudio.currentTime = 0;
        this._fakeAudio.play();
      },
      false
    );

    this.setPauseHandler(() => this.togglePlay());
    this.setPlayHandler(() => this.togglePlay());
    this.setSeekBackwardHandler(() => true);
    this.setSeekForwardHandler(() => true);
    this.setNextTrackHandler(() => player.playNext());
    this.setPreviousTrackHandler(() => player.playPrevious());

    player.addOnSongChangeListener(this._handlePlayerSongChange);
    player.addOnTogglePlayListener(this._handlePlayerTogglePause);
  }

  togglePlay() {
    player.togglePlay();
    if (player.isPlaying) {
      this.play();
    } else {
      this.pause();
    }
  }

  play() {
    if (this.supportsMediaSession) {
      this._fakeAudio.play();
      navigator.mediaSession.playbackState = "playing";
    }
  }

  pause() {
    if (this.supportsMediaSession) {
      this._fakeAudio.pause();
      navigator.mediaSession.playbackState = "paused";
    }
  }

  setPauseHandler(callback) {
    this._setHandler("pause", callback);
  }

  setPlayHandler(callback) {
    this._setHandler("play", callback);
  }

  setSeekBackwardHandler(callback) {
    this._setHandler("seekbackward", callback);
  }

  setSeekForwardHandler(callback) {
    this._setHandler("seekforward", callback);
  }

  setPreviousTrackHandler(callback) {
    this._setHandler("previoustrack", callback);
  }

  setNextTrackHandler(callback) {
    this._setHandler("nexttrack", callback);
  }

  update(song) {
    if (!this.supportsMediaSession) {
      return;
    }

    if (song) {
      let albumCoverUrl = UrlProvider.getUrlToAlbumCover(song.albumId, 600);

      navigator.mediaSession.metadata = new MediaMetadata({
        title: song.title,
        artist: "Twenty One Pilots",
        artwork: [
          {
            src: albumCoverUrl,
            sizes: "600x600",
            type: "image/jpeg",
          },
        ],
      });
    } else {
      this._fakeAudio.src = MediaSessionManager.__FAKE_AUDIO_SRC;
      navigator.mediaSession.metadata = null;
    }
  }

  _handlePlayerSongChange(songDescription) {
    this.update(songDescription);
  }

  _handlePlayerTogglePause(isPlaying) {
    if (isPlaying) {
      this.play();
    } else {
      this.pause();
    }
  }

  _setHandler(name, callback) {
    if (this.supportsMediaSession) {
      navigator.mediaSession.setActionHandler(name, null);
      navigator.mediaSession.setActionHandler(name, callback);
    }
  }
}

let instance = new MediaSessionManager();

// export { instance };
