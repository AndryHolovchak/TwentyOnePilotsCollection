import React, { Component } from "react";
import {
  mp3Cache,
  urlCacheStateEnum,
} from "../../js/helpers/CacheApiSystem.js";
import "./songCachingButton.less";

class SongCachingButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mp3IsCached: false,
      mp3IsCaching: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleUrlCacheStateChange = this.handleUrlCacheStateChange.bind(this);
    this.init();
  }

  async init() {
    mp3Cache.addUrlCacheStateListener(
      this.props.mp3Url,
      this.handleUrlCacheStateChange
    );
    let mp3IsCached = await mp3Cache.isCached(this.props.mp3Url);
    this.setState({ mp3IsCached, mp3IsCaching: false });
  }
  async handleClick(e) {
    e.stopPropagation();
    mp3Cache.toggle(this.props.mp3Url);
  }

  handleUrlCacheStateChange(urlCacheState) {
    if (urlCacheState == urlCacheStateEnum.Uncached) {
      this.setState({ mp3IsCached: false, mp3IsCaching: false });
    } else if (urlCacheState == urlCacheStateEnum.Caching) {
      this.setState({ mp3IsCached: false, mp3IsCaching: true });
    } else {
      this.setState({ mp3IsCached: true, mp3IsCaching: false });
    }
  }

  componentWillUnmount() {
    mp3Cache.removeUrlCacheStateListener(
      this.targetUrl,
      this.handleUrlCacheStateChange
    );
  }

  render() {
    let className = ["song-caching-button"];

    if (this.state.mp3IsCaching) {
      className.push("song-caching-button--in-progress");
    } else if (this.state.mp3IsCached) {
      className.push("song-caching-button--cached");
    }

    return (
      <div
        className={className.join(" ")}
        style={{ color: this.props.cachedColor }}
        onClick={this.handleClick}
      >
        <span className="song-caching-button__text">offline</span>
      </div>
    );
  }
}

export { SongCachingButton };
