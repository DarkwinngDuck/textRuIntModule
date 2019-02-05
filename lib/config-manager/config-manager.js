class ConfigManager {
  constructor(Config) {
    this.CreateConfig = Config;
    this.cache = {};
  }

  setConfig(config) {
    const {
      type = 'default', ...options
    } = config;
    this.cache[type] = new this.CreateConfig(options);
  }

  getConfig(type) {
    if (Object.prototype.hasOwnProperty.call(this.cache, type)) {
      return this.cache[type];
    }
    throw new Error(`there isn't any config type ${type}`);
  }

  getConfigsTypes() {
    return Object.keys(this.cache);
  }

  reset() {
    this.cache = {};
  }
}

module.exports = ConfigManager;
