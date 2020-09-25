import React, { Component } from "react";
import "./videoBlock.less";
import { UrlProvider } from "../../js/utils/UrlProvider.js";

function VideoBlock({ title, youtubeVideoId }) {
  return (
    <div className="video-block">
      <div className="video-block__title-wrap">
        <span>{title}</span>
      </div>
      <iframe
        src={UrlProvider.getUrlToYoutubeIframe(youtubeVideoId)}
        loading="lazy"
        frameBorder="0"
        allowFullScreen="allowFullScreen"
      ></iframe>
    </div>
  );
}

export { VideoBlock };
