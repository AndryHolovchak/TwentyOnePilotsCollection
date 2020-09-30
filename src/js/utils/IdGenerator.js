class IdGenerator {
  static _nextId = 0;
  static generate() {
    return this._nextId++;
  }
}

export { IdGenerator };
