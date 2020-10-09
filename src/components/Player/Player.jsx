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
    return <>
      <iframe data-aa="1485040" src="//ad.a-ads.com/1485040?size=468x60" scrolling="no" style={{width: "468px", height: "60px", border: "0px", padding: "0px", overflow: "hidden"}} allowTransparency="true"></iframe></>;
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
            className={`player__button player__shuffle-button ${player.isShuffleModeOn ? "player__button--activated" : ""
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
              className={`player__button player__${player.isPlaying() ? "pause" : "play"
                }-button`}
            ></div>
            <div
              className="player__button player__next-audio-button"
              onClick={() => player.playNext()}
            ></div>
          </div>
          <div
            className={`player__button player__repeat-button ${player.isRepeatOneModeOn ? "player__button--activated" : ""
              }`}
            onClick={this.handleRepeatButtonClick}
          ></div>
        </div>
      </div>
    );
  }
}

export { Player };
