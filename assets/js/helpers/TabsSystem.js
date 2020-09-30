class TabsSystem {
  constructor(tabCount, activeTabIndex = 0) {
    this._tabCount = tabCount;
    this._activeTabIndexListeners = [];
    this._prevActiveTabIndex = -1;
    this._activeTabIndex = activeTabIndex;
  }
  get activeTabIndex() {
    return this._activeTabIndex;
  }
  get prevActiveTabIndex() {
    return this._prevActiveTabIndex;
  }
  set activeTabIndex(value) {
    if (this._activeTabIndex !== value) {
      this._prevActiveTabIndex = this._activeTabIndex;
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
      this._activeTabIndexListeners[i](
        this._prevActiveTabIndex,
        this._activeTabIndex
      );
    }
  }
}

export { TabsSystem };
