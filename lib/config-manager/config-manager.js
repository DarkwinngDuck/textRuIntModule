class ConfigManager {
  constructor(Config) {
    this.CreateConfig = Config;
    this.cache = {};
  }

  setConfiguration(config) {
    const {
      type = 'default', ...options
    } = config;
    this.cache[type] = new this.CreateConfig(options);
  }

  getConfiguration(type) {
    if (Object.prototype.hasOwnProperty.call(this.cache, type)) {
      return this.cache[type];
    }
    throw new Error(`there isn't any config type ${type}`);
  }

  getConfigurationsTypes() {
    return Object.keys(this.cache);
  }

  resetConfigurationsCache() {
    this.cache = {};
  }
}

module.exports = ConfigManager;
