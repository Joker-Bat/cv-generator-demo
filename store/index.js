class DataStore {
  constructor() {
    this.jsonStore = {};
  }

  getJsonData(key) {
    const value = this.jsonStore[key];
    if (value && Object.keys(value).length === 0) {
      return null;
    }

    return value;
  }

  setJsonData(key, value) {
    this.jsonStore[key] = value;
  }
}

const dataStore = new DataStore();

module.exports = dataStore;
