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

  setProvider(provider) {
    this.provider = provider;
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
    const config = this.getConfig(type);
    const response = await this.client.sendJobToCheck({
      ...config,
      ...ctx,
    });
    if (this.provider) {
      await this.provider.save(response, ctx);
    }
    return response;
  }

  async getResult(type, ctx) {
    const config = this.getConfig(type);
    const response = await this.client.getCheckResult({
      ...config,
      ...ctx,
    });
    if (this.provider) {
      await this.provider.save(response);
    }
    return response;
  }
}

module.exports = TextRuIntegrationModuleApi;
