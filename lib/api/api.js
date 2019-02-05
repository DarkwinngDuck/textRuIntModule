class TextRuIntegrationModuleApi {
  constructor({ client, manager }) {
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

  async getAccountInfo(configType) {
    const config = this.manager.getConfig(configType);
    const response = await this.client.getAccountInfo(config);
    if (this.storage) {
      await this.storage.save(response);
    }
    return response;
  }

  async sendJobToCheck(configType, ctx) {
    if (ctx.text) {
      const config = this.manager.getConfig(configType);
      const response = await this.client.sendJob(config, ctx);
      if (this.storage) {
        await this.storage.save(response);
      }
      return response;
    }
    return new Error('There isn\'t any text to check');
  }

  async getCheckResult(configType, ctx) {
    if (ctx.uid) {
      const config = this.manager.getConfig(configType);
      const response = await this.client.sendJob(config, ctx);
      if (this.storage) {
        await this.storage.save(response);
      }
      return response;
    }
    return new Error('There isn\'t text id to check result');
  }
}

module.exports = TextRuIntegrationModuleApi;
