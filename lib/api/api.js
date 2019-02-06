class TextRuIntegrationModuleApi {
  constructor({
    client,
    manager,
  }) {
    this.client = client;
    this.manager = manager;
  }

  setConfigs(configs) {
    configs.forEach((config) => {
      this.manager.setConfiguration(config);
    });
    return this;
  }

  setStorage(storage) {
    this.storage = storage;
    return this;
  }

  resetConfigs() {
    this.manager.resetConfigurationsCache();
    return this;
  }

  getConfig(type) {
    return this.manager.getConfiguration(type);
  }

  async getInfo(type) {
    const config = this.getConfig(type);
    const response = await this.client.getAccountInfo(config);
    return response;
  }

  async sendJob(type, ctx) {
    if (type && ctx.text) {
      const config = this.getConfig(type);
      const response = await this.client.sendJobToCheck(config, ctx);
      if (this.storage) {
        await this.storage.save(response);
      }
      return response;
    }
    throw new Error('There aren\'t all required parameters to check result');
  }

  async getResult(type, ctx) {
    if (type && ctx.uid) {
      const config = this.getConfig(type);
      const response = await this.client.getCheckResult(config, ctx.uid);
      if (this.storage) {
        await this.storage.save(response);
      }
      return response;
    }
    throw new Error('There aren\'t all required parameters to check result');
  }
}

module.exports = TextRuIntegrationModuleApi;
