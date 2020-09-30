import React, { Component } from "react";
import { instance as player } from "../../js/helpers/Player.js";
import { instance as playerPlaybackListener } from "../../js/helpers/PlayerPlaybackListener.js";
import { bindMethods } from "../../js/utils/BindMethods";
import "./song.less";
import { UrlProvider } from "../../js/utils/UrlProvider";
import { SongCachingButton } from "../SongCachingButton/SongCachingButton.jsx";
import { Downloader } from "../../js/utils/Downloader";

class Song extends Component {
  static DEFAULT_ACCENT_COLOR = "#C9C93D";

  constructor(props) {
    super(props);
    this.mp3Url = UrlProvider.getUrlToMp3(props.info.id);
    bindMethods(this, [
      "handleSongClick",
      "handleDownloadButtonClick",
      "handleInteractionWithPlayer",
    ]);
    playerPlaybackListener.addListenerForSong(
      props.info.instanceId,
      this.handleInteractionWithPlayer
    );
  }

  handleInteractionWithPlayer() {
    this.forceUpdate();
  }

  handleSongClick(e) {
    if (player.isCurrentSong(this.props.info)) {
      player.togglePlay();
    } else if (player.isInPlaylist(this.props.info)) {
      player.playFromPlaylist(this.props.info);
    } else {
      this.props.playlistCreator();
      player.playFromPlaylist(this.props.info);
    }
  }

  async handleDownloadButtonClick(e) {
    Downloader.downloadMp3(this.props.info.id, this.props.info.title);
    e.stopPropagation();
  }

  componentWillUnmount() {
    playerPlaybackListener.removeListenerForSong(
      this.instanceID,
      this.handleInteractionWithPlayer
    );
  }

  render() {
    let songClassName = ["song"];
    let accentColor = this.props.info.accentColor || Song.DEFAULT_ACCENT_COLOR;

    if (player.isCurrentSong(this.props.info)) {
      songClassName.push("song--currently-playing");
      if (!player.isPlaying()) {
        songClassName.push("song--paused");
      }
    }
    return (
      <div
        className={songClassName.join(" ")}
        style={{
          borderLeftColor: accentColor,
        }}
        onClick={this.handleSongClick}
      >
        <div className="song__info">
          <img
            src={UrlProvider.getUrlToAlbumCover(this.props.info.albumId, 68)}
            loading="lazy"
            className="song__album-cover"
          ></img>
          <div className="song__main-info">
            <div className="song__title">
              <span>{this.props.info.title}</span>
            </div>
          </div>
        </div>
        <div className="song__buttons-container">
          <SongCachingButton
            cachedColor={accentColor}
            mp3Url={this.mp3Url}
          ></SongCachingButton>
          {/* <div
            className="song__button song__download-button"
            onClick={this.handleDownloadButtonClick}
          ></div> */}
        </div>
      </div>
    );
  }
}

export { Song };
