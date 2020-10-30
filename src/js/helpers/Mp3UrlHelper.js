const { UrlProvider } = require("../utils/UrlProvider");
const { mp3Cache, urlCacheStateEnum } = require("./CacheApiSystem");

class Mp3UrlHelper {
  _urlsToMp3 = {};
  _urlsToCachedMp3 = {};

  constructor() {
    mp3Cache.addCacheChangesListener(this._handleCacheChange);
    mp3Cache.callAfterInitialization(this._handleCacheInitialization);
  }

  _handleCacheInitialization = async () => {
    let urls = await mp3Cache.getAllUrls();
    for (let url of urls) {
      let relativeUrl = UrlProvider.getRelativeURL(url);
      this._urlsToCachedMp3[relativeUrl] = await this._generateUrlForCachedMp3(
        relativeUrl
      );
    }
  };

  _generateUrlForCachedMp3 = async (url) => {
    let urlResponse = await mp3Cache.getResponseFor(url);
    let responseBlob = await urlResponse.blob();
    return URL.createObjectURL(responseBlob);
  };

  _handleCacheChange = async (url, change) => {
    if (change == urlCacheStateEnum.Cached) {
      this._urlsToCachedMp3[url] = await this._generateUrlForCachedMp3(url);
    } else {
      this._urlsToCachedMp3[url] = null;
    }
  };

  getUrlFor = (uuid) => {
    this._urlsToMp3[uuid] =
      this._urlsToMp3[uuid] || UrlProvider.getUrlToMp3(uuid);
    let url = this._urlsToMp3[uuid];

    return this._urlsToCachedMp3[url] || url;
  };
}

module.exports = new Mp3UrlHelper();
