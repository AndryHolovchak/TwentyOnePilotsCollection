import React from "react";
import "./playerProgresBar.less";
import { bindMethods } from "../../js/utils/BindMethods.js";
import { normalizeNumber, clampNumber } from "../../js/utils/NumberUtils.js";
import { secToHMSS, secToMSS, secToHours } from "../../js/utils/TimeUtils.js";
import { instance as player } from "../../js/helpers/Player.js";

class PlayerProgressBar extends React.Component {
  static PRECISION = 15;
  static _getTimeToDisplay(sec) {
    return secToHours(sec) > 0 ? secToHMSS(sec) : secToMSS(sec);
  }

  constructor() {
    super();
    this.state = {
      progress: 0,
    };

    this.isPlayerSongChanged = false;
    this.duration = 0;
    this.formattedDuration = "";
    this.isMouseDown = false;
    this.intervalId = null;
    this.containerRef = React.createRef();
    this.progressBarRef = React.createRef();

    bindMethods(this, [
      "handleMouseDown",
      "handleMouseUp",
      "handleMouseMove",
      "handlePlayerSongChange",
    ]);

    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);

    document.addEventListener("touchmove", this.handleMouseMove);
    document.addEventListener("touchend", this.handleMouseUp);

    player.addOnSongChangeListener(this.handlePlayerSongChange);
  }

  handlePlayerSongChange() {
    this.isPlayerSongChanged = true;
  }

  handleMouseDown(e) {
    if (player.currentSong) {
      this.isMouseDown = true;
    }
  }

  handleMouseUp(e) {
    if (!this.isMouseDown) {
      return;
    }

    this.handleMouseMove(e);

    let newAudioProgress =
      this.progressBarRef.current.offsetWidth /
      this.containerRef.current.offsetWidth;

    player.progress = newAudioProgress;
    this.isMouseDown = false;
  }

  handleMouseMove(e) {
    if (!this.isMouseDown || !player.currentSong) {
      return;
    }

    let containerLeftSide = this.containerRef.current.getBoundingClientRect()
      .left;

    let containerWidth = this.containerRef.current.offsetWidth;
    let posXWithinContainer = clampNumber(
      (e.clientX || e.changedTouches[0].clientX || e.touches[0].clientX) -
        containerLeftSide,
      0,
      containerWidth
    );

    let newProgress =
      100 * normalizeNumber(posXWithinContainer, 0, containerWidth);

    this.setState({ progress: newProgress / 100 });
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      if (this.isMouseDown) {
        return;
      }

      let playerProgress = player.progress;

      if (this.state.progress === playerProgress) {
        return;
      }

      this.setState({ progress: playerProgress });
    }, PlayerProgressBar.PRECISION);
  }

  componentWillUnmount() {
    player.removeOnSongChangeListener(this.handlePlayerSongChange);
    clearInterval(this.intervalId);
  }

  render() {
    if (this.isPlayerSongChanged && player.isMetadataLoaded) {
      this.isPlayerSongChanged = false;
      this.duration = player.duration;
      this.formattedDuration = PlayerProgressBar._getTimeToDisplay(
        this.duration
      );
    }

    let formattedCurrentTime = PlayerProgressBar._getTimeToDisplay(
      this.duration * this.state.progress
    );

    return (
      <div className="player-progress-bar">
        {player.currentSong && (
          <span className="player-progress-bar__current-time">
            {formattedCurrentTime}
          </span>
        )}
        <div
          className="player-progress-bar__line-container"
          ref={this.containerRef}
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleMouseDown}
        >
          <div
            ref={this.progressBarRef}
            className="player-progress-bar__line"
            style={{ width: 100 * this.state.progress + "%" }}
          ></div>
        </div>
        {player.currentSong && (
          <span className="player-progress-bar__song-duration">
            {this.formattedDuration}
          </span>
        )}
      </div>
    );
  }
}

export { PlayerProgressBar };
