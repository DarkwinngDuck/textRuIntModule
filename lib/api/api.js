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
    const { text } = ctx;
    const config = this.getConfig(type);
    const response = await this.client.sendJobToCheck(config, text);
    if (this.storage) {
      await this.storage.save(response, ctx);
    }
    return response;
  }

  async getResult(type, ctx) {
    const { uid } = ctx;
    const config = this.getConfig(type);
    const response = await this.client.getCheckResult(config, uid);
    if (this.storage) {
      await this.storage.save(response);
    }
    return response;
  }
}

module.exports = TextRuIntegrationModuleApi;
