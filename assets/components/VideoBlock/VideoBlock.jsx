import React, { Component } from "react";
import "./videoBlock.less";
import { UrlProvider } from "../../js/utils/UrlProvider.js";

class VideoBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoShouldBeLoaded: false,
    };
    this.handlePreviewClick = this.handlePreviewClick.bind(this);
  }

  handlePreviewClick() {
    this.setState({ videoShouldBeLoaded: true });
  }

  generateIframe() {
    return (
      <iframe
        src={UrlProvider.getUrlToYoutubeIframe(this.props.youtubeVideoId)}
        frameBorder="0"
        autoPlay=""
        allowFullScreen=""
      ></iframe>
    );
  }

  generatePreview() {
    return (
      <div className="video-block__preview" onClick={this.handlePreviewClick}>
        <img
          src={UrlProvider.getUrlToYoutubePreview(this.props.youtubeVideoId)}
          alt=""
          className="video-block__preview-img"
        ></img>
        <img
          src="assets/img/icons/youtube-button.svg"
          alt=""
          className="video-block__preview-button"
        />
      </div>
    );
  }

  render() {
    return (
      <div className="video-block">
        <div className="video-block__title-wrap">
          <span>{this.props.title}</span>
        </div>
        {this.state.videoShouldBeLoaded
          ? this.generateIframe()
          : this.generatePreview()}
      </div>
    );
  }
}

export { VideoBlock };
