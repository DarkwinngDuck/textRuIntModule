const ConfigManager = require('../lib/config-manager/config-manager');

class Config {
  constructor({
    uri = '',
    userkey = '',
  }) {
    this.uri = uri;
    this.userkey = userkey;
  }
}

describe('[TextRuIntegrationModule] ConfigManager', () => {
  let configManager;

  beforeEach(() => {
    configManager = new ConfigManager(Config);
  });

  test('should create an instance of configManager', () => {
    expect(configManager).toBeDefined();
  });

  test('should add to its cache instance of Config with default type', () => {
    const type = 'default';
    configManager.setConfiguration(new Config({}));
    expect(configManager.cache[type]).toBeDefined();
  });

  test('should add to its cache instance of Config with expected type', () => {
    const type = 'expected';
    configManager.setConfiguration({
      type,
      options: new Config({}),
    });
    expect(configManager.cache[type]).toBeDefined();
  });

  test('should return a config of expected type', () => {
    const type = 'expected';
    configManager.setConfiguration({
      type,
      config: new Config({}),
    });
    const config = configManager.getConfiguration(type);
    expect(config).toBeDefined();
  });

  test('should throw an error config of expected type does not exists', () => {
    const type = 'expected';
    expect(() => {
      configManager.getConfiguration(type);
    }).toThrowError();
  });

  test('should return all config types', () => {
    configManager.setConfiguration({
      type: 'some',
      options: new Config({}),
    });
    configManager.setConfiguration(new Config({}));
    const total = configManager.getConfigurationsTypes();
    expect(total.length).toBe(2);
  });

  test('should reset configs cache', () => {
    configManager.cache = {
      confOne: {},
      confTwo: {},
    };
    configManager.resetConfigurationsCache();
    expect(configManager.cache).toEqual({});
  });
});
