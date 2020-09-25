class TabsSystem {
  constructor(tabCount, activeTabIndex = 0) {
    this._tabCount = tabCount;
    this._activeTabIndex = activeTabIndex;
    this._activeTabIndexListeners = [];
  }
  get activeTabIndex() {
    return this._activeTabIndex;
  }
  set activeTabIndex(value) {
    if (this._activeTabIndex !== value) {
      this._activeTabIndex = value;
      this._triggerActiveTabListeners();
    }
  }
  addActiveTabIndexListener(callback) {
    this._activeTabIndexListeners.push(callback);
  }
  removeActiveTabIndexListener(callback) {
    let callbackIndex = this._activeTabIndexListeners.indexOf(callback);
    if (callbackIndex != -1) {
      this._activeTabIndexListeners.splice(callbackIndex, 1);
    }
  }
  _triggerActiveTabListeners() {
    for (let i = 0; i < this._activeTabIndexListeners.length; i++) {
      this._activeTabIndexListeners[i]();
    }
  }
}

export { TabsSystem };
