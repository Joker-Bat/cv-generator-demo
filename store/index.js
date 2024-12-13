const { randomUUID } = require("crypto");

class DataStore {
  constructor() {
    this.jsonStore = {};
  }

  getUserData(userId) {
    const value = this.jsonStore[userId];
    if (value && Object.keys(value).length === 0) {
      return null;
    }

    return value;
  }

  addUser(email) {
    const userId = randomUUID();

    this.jsonStore[userId] = {
      id: userId,
      email,
      profileDetails: {},
      updatedAt: new Date().toISOString(),
    };

    return userId;
  }

  updateProfileDetails(userId, profileDetails) {
    this.jsonStore[userId] = {
      ...this.jsonStore[userId],
      profileDetails,
      updatedAt: new Date().toISOString(),
    };
  }

  userByEmail(email) {
    const keys = Object.keys(this.jsonStore);

    for (const key of keys) {
      const user = this.jsonStore[key];

      if (user.email === email) {
        return user;
      }
    }

    return null;
  }

  userHasProfileDetails(userId) {
    const value = this.jsonStore[userId];
    if (
      value &&
      value.profileDetails &&
      Object.keys(value.profileDetails).length === 0
    ) {
      return false;
    }

    return true;
  }
}

const dataStore = new DataStore();

module.exports = dataStore;
