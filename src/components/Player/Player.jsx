import React from "react";
import "./player.less";
import { Song } from "../Song/Song.jsx";
import { bindMethods } from "../../js/utils/BindMethods.js";
import { PlayerProgressBar } from "../PlayerProgressBar/PlayerProgressBar.jsx";
import { instance as player } from "../../js/helpers/Player.js";

class Player extends React.Component {
  constructor() {
    super();
    bindMethods(this, [
      "handleShuffleButtonClick",
      "handleRepeatButtonClick",
      "handlePlayerSongChange",
      "handlePlayerTogglePlay",
    ]);

    player.addOnSongChangeListener(this.handlePlayerSongChange);
    player.addOnTogglePlayListener(this.handlePlayerTogglePlay);
  }

  handlePlayerSongChange() {
    this.forceUpdate();
  }

  handlePlayerTogglePlay() {
    this.forceUpdate();
  }

  handleShuffleButtonClick() {
    player.toggleShuffleMode();
    this.forceUpdate();
  }

  handleRepeatButtonClick() {
    player.toggleRepeatOneMode();
    this.forceUpdate();
  }

  componentWillUnmount() {
    player.removeOnSongChangeListener(this.handlePlayerSongChange);
    player.removeOnTogglePlayListener(this.handlePlayerTogglePlay);
  }

  getAd() {
    return (
      <iframe
        className="player__ad"
        scrolling="no"
        frameBorder="0"
        style={{
          padding: "0px",
          margin: "0px",
          border: "0px",
          borderStyle: "none",
        }}
        width="468"
        height="60"
        src="https://refpakxdxg.top/I?tag=s_686647m_38151c_&site=686647&ad=38151"
      ></iframe>
    );
  }

  // {player.currentSong && (
  //   <Song key={player.currentSong.id} info={player.currentSong}></Song>
  // )}

  render() {
    return (
      <div className="player">
        <PlayerProgressBar></PlayerProgressBar>
        {player.currentSong ? (
          <Song key={player.currentSong.id} info={player.currentSong}></Song>
        ) : (
          this.getAd()
        )}

        <div className="player__controll-panel">
          <div
            className={`player__button player__shuffle-button ${
              player.isShuffleModeOn ? "player__button--activated" : ""
            }`}
            onClick={this.handleShuffleButtonClick}
          ></div>
          <div className="player__main-controlls">
            <div
              className="player__button player__previous-audio-button"
              onClick={() => player.playPrevious()}
            ></div>
            <div
              onClick={() => player.togglePlay()}
              className={`player__button player__${
                player.isPlaying() ? "pause" : "play"
              }-button`}
            ></div>
            <div
              className="player__button player__next-audio-button"
              onClick={() => player.playNext()}
            ></div>
          </div>
          <div
            className={`player__button player__repeat-button ${
              player.isRepeatOneModeOn ? "player__button--activated" : ""
            }`}
            onClick={this.handleRepeatButtonClick}
          ></div>
        </div>
      </div>
    );
  }
}

export { Player };
