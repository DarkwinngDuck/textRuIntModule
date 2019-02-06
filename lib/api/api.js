class TextRuIntegrationModuleApi {
  constructor({
    client,
    manager,
  }) {
    this.client = client;
    this.manager = manager;
  }

  setupConfigs(configs) {
    configs.forEach((config) => {
      this.manager.setConfig(config);
    });
    return this;
  }

  setupStorage(storage) {
    this.storage = storage;
    return this;
  }

  getConfiguration(type) {
    return this.manager.getConfig(type);
  }

  async getAccInfo(configType) {
    const config = this.getConfiguration(configType);
    const response = await this.client.getAccountInfo(config);
    return response;
  }

  async sendJobToCheck(configType, ctx) {
    if (configType && ctx.text) {
      const config = this.getConfiguration(configType);
      const response = await this.client.sendJob(config, ctx);
      if (this.storage) {
        await this.storage.save(response);
      }
      return response;
    }
    throw new Error('There aren\'t all required parameters to check result');
  }

  async getCheckResult(configType, ctx) {
    if (configType && ctx.uid) {
      const config = this.getConfiguration(configType);
      const response = await this.client.getResult(config, ctx.uid);
      if (this.storage) {
        await this.storage.save(response);
      }
      return response;
    }
    throw new Error('There aren\'t all required parameters to check result');
  }
}

module.exports = TextRuIntegrationModuleApi;
