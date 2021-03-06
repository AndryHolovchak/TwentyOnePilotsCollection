import React, { Component, useEffect, useState } from "react";
import { Song } from "../Song/Song.jsx";
import { SongInfo } from "../../js/model/SongInfo.js";
import { Playlist } from "../Playlist/Playlist.jsx";
import "./album.less";
import "../../style/misc.less";
import "../../style/customScrollbars.less";
import { UrlProvider } from "../../js/utils/UrlProvider.js";
import { bindMethods } from "../../js/utils/BindMethods.js";

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInitialized: false,
      isOpened: false,
      name: "",
      accentColor: "#fff",
    };

    bindMethods(this, ["handlePreviewClick", "handleHideAnimationEnd"]);

    this.shouldBeHidden = true;
    this.initialize();
  }

  async initialize() {
    let response = await fetch(
      UrlProvider.getUrlToAlbumJson(this.props.albumId)
    );
    let albumInfoJson = await response.json();
    this.songs = albumInfoJson.songs.map(
      (song) =>
        new SongInfo(song, this.props.albumId, albumInfoJson.accentColor)
    );
    this.setState({
      isInitialized: true,
      name: albumInfoJson.name,
      accentColor: albumInfoJson.accentColor,
    });
  }

  handleHideAnimationEnd(e) {
    if (e.animationName == "hide") {
      this.shouldBeHidden = true;
      this.forceUpdate();
    }
  }

  handlePreviewClick(e) {
    e.stopPropagation();
    this.setState({ isOpened: !this.state.isOpened });
  }

  render() {
    if (!this.state.isInitialized) {
      return <div className="album"></div>;
    }

    let albumClassName = "with-hidden-scrollbar album ";
    let albumContentClassName = "album__content";

    if (this.state.isOpened) {
      albumClassName += "album--opened";
    } else {
      albumClassName += "album--closed";
      if (this.shouldBeHidden) {
        albumContentClassName += " hidden";
        this.shouldBeHidden = false;
      }
    }

    return (
      <div className={albumClassName}>
        <div className="album__preview" onClick={this.handlePreviewClick}>
          <span
            className="album__title"
            style={{ borderBottom: `1px solid ${this.state.accentColor}` }}
          >
            {this.state.name}
          </span>

          <img
            src={UrlProvider.getUrlToAlbumCover(this.props.albumId, 600)}
            className="album__cover"
            width="32px"
            loading="lazy"
            alt="cover"
          />
        </div>
        <div
          className={albumContentClassName}
          onAnimationEnd={this.handleHideAnimationEnd}
        >
          <Playlist songsInfo={this.songs}></Playlist>
        </div>
      </div>
    );
  }
}

export { Album };
