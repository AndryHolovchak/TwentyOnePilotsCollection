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
    // return (
    //   <a href="http://refpazradt.top/L?tag=s_686647m_355c_&site=686647&ad=355">
    //     <img src="assets/img/1xbet.gif" className="player__add" />
    //   </a>
    // );

    return (
      <iframe
        scrolling="no"
        frameBorder="0"
        style={{
          padding: "0px",
          margin: "0px",
          border: "0px",
          borderStyle: "none",
          maxWidth: "100%",
        }}
        width="600"
        height="90"
        src="https://refpakglscpj.best/I?tag=s_716259m_2141c_&site=716259&ad=2141"
      ></iframe>
    );
  }

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
