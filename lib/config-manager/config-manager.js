class ConfigManager {
  constructor(Config) {
    this.CreateConfig = Config;
    this.cache = {};
    this.defaultType = 'default';
  }

  isInCache(type) {
    return Object.prototype.hasOwnProperty.call(this.cache, type);
  }

  setConfiguration(config) {
    const {
      type = this.defaultType, ...options
    } = config;
    this.cache[type] = new this.CreateConfig(options);
  }

  getConfiguration(type = this.defaultType) {
    if (this.isInCache(type)) {
      return this.cache[type];
    }
    throw new Error('Configuration not found');
  }

  getConfigurationsTypes() {
    return Object.keys(this.cache);
  }

  resetConfigurationsCache() {
    this.cache = {};
  }
}

module.exports = ConfigManager;
