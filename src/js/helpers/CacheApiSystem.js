import { ExtendedEvent } from "./ExtendedEvent";

const CACHE_AVAILABLE = "caches" in self;
const CACHE_NAME = "mp3-cache";
const urlCacheStateEnum = Object.freeze({
  Uncached: 1,
  Caching: 2,
  Cached: 3,
});

class CacheApiSystem {
  constructor(cacheName) {
    if (CACHE_AVAILABLE) {
      this._initialized = false;
      this._initializationListeners = [];
      this._onUrlCacheStateChange = new ExtendedEvent();
      this._onCacheChange = new ExtendedEvent();
      caches.open(cacheName).then((cache) => {
        this._initialize(cache);
      });
    }
  }

  _initialize(cache) {
    this._cache = cache;
    this._initialized = true;
    for (let callback of this._initializationListeners) {
      callback();
    }
  }

  async getAllUrls() {
    if (this._initialized) {
      let keys = await this._cache.keys();
      return keys.map((response) => response.url);
    }
    return [];
  }

  async add(url) {
    if (this._initialized) {
      this._onUrlCacheStateChange.trigger(url, urlCacheStateEnum.Caching);
      this._onCacheChange.trigger(null, url, urlCacheStateEnum.Caching);
      await this._cache.add(url);
      this._onCacheChange.trigger(null, url, urlCacheStateEnum.Cached);
      this._onUrlCacheStateChange.trigger(url, urlCacheStateEnum.Cached);
    }
  }

  async remove(url) {
    if (this._initialized) {
      await this._cache.delete(url);
      this._onCacheChange.trigger(null, url, urlCacheStateEnum.Uncached);
      this._onUrlCacheStateChange.trigger(url, urlCacheStateEnum.Uncached);
    }
  }

  async toggle(url) {
    if (this._initialize) {
      let isCached = await this.isCached(url);
      isCached ? this.remove(url) : this.add(url);
    }
  }

  async isCached(url) {
    if (this._initialized) {
      let isInCache = await this._cache.match(url);
      return isInCache;
    }
  }

  async getResponseFor(url) {
    let result = await this._cache.match(url);
    return result;
  }

  addUrlCacheStateListener(url, callback) {
    this._onUrlCacheStateChange.addListener(callback, url);
  }

  removeUrlCacheStateListener(url, callback) {
    this._onUrlCacheStateChange.removeListener(callback, url);
  }

  addCacheChangesListener(callback) {
    this._onCacheChange.addListener(callback);
  }

  removeCacheChangesListener(callback) {
    this._onCacheChange.removeListener(callback);
  }

  callAfterInitialization(callback) {
    this._initializationListeners.push(callback);
  }
}

let mp3Cache = new CacheApiSystem(CACHE_NAME);

export { mp3Cache, urlCacheStateEnum };
