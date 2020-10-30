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

  static getRelativeURL = (absoluteUrl) => {
    // remove the :// and split the string by '/'
    var the_arr = absoluteUrl.replace("://", "").split("/");

    // remove the first element (the domain part)
    the_arr.shift();

    // join again the splitted parts and return them with a '/' preceding
    // return "/" + the_arr.join("/");
    return the_arr.join("/");
  };
}

export { UrlProvider };
