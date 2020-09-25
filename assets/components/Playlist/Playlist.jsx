import React, { Component } from "react";
import { IdGenerator } from "../../js/utils/IdGenerator";
import { Song } from "../Song/Song.jsx";
import { instance as player } from "../../js/helpers/Player.js";
import "./playlist.less";

class Playlist extends Component {
  constructor() {
    super();
    this.playlistId = IdGenerator.generate();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.songsInfo.length != this.props.songsInfo.length) {
      return true;
    }

    for (let i = 0; i < nextProps.songsInfo.length; i++) {
      if (nextProps.songsInfo[i] != this.props.songsInfo[i]) {
        return true;
      }
    }

    return false;
  }

  render() {
    return (
      <div className="playlist">
        <div className="container p-0">
          <div className="row no-gutters">
            <div className="col playlist__inner">
              {this.props.songsInfo.map((song) => (
                <Song
                  key={song.id}
                  info={song}
                  playlistCreator={() =>
                    player.createNewPlaylist(
                      this.props.songsInfo,
                      this.playlistId
                    )
                  }
                ></Song>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { Playlist };
