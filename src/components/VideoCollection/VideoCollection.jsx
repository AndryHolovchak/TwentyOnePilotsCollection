import React, { Component } from "react";
import { VideoBlock } from "../VideoBlock/VideoBlock.jsx";
import "./videoCollection.less";

class VideoCollection extends Component {
  constructor() {
    super();
    this.state = {
      isInitialized: false,
    };
    this.videos = null;
    this.initialize();
  }

  async initialize() {
    let response = await fetch("data/videos.json");
    this.videos = await response.json();
    this.setState({ isInitialized: true });
  }

  render() {
    if (!this.state.isInitialized) {
      return <div className="video-collection"></div>;
    }
    return (
      <div className="video-collection">
        <div className="container-fluid">
          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 video-collection__row">
            {this.videos.map((video, i) => (
              <div key={i} className="col">
                <VideoBlock
                  title={video.title}
                  youtubeVideoId={video.youtubeId}
                ></VideoBlock>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export { VideoCollection };
