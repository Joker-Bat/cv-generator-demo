class DataStore {
  constructor() {
    this.jsonStore = {};
  }

  getJsonData(key) {
    return this.jsonStore[key];
  }

  setJsonData(key, value) {
    this.jsonStore[key] = value;
  }
}

const dataStore = new DataStore();

module.exports = dataStore;
