class UrlProvider {
  static getUrlToMp3(songId) {
    return `data/mp3/${songId}.mp3`;
  }
  static getUrlToAlbumCover(albumId, size) {
    return `data/covers/${size}/${albumId}.jpg`;
  }
  static getUrlToAlbumJson(albumId) {
    return `data/albums/${albumId}.json`;
  }
  static getUrlToYoutubeIframe(videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  static getUrlToYoutubePreview(videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
}

export { UrlProvider };
