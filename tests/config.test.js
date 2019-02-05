const Config = require('../lib/config/config');

describe('[TextRuIntegrationModule] Config', () => {
  let config;

  beforeEach(() => {
    config = new Config({});
  });

  test('should create a default instance of config', () => {
    expect(config).toBeDefined();
  });

  test('should create an instance of config with expected userkey', () => {
    const userkey = 'some';
    const defaultConfig = new Config({
      userkey,
    });
    expect(defaultConfig.userkey).toBe(userkey);
  });
  test('should create an instance of config with expected uri', () => {
    const uri = 'some';
    const defaultConfig = new Config({
      uri,
    });
    expect(defaultConfig.uri).toBe(uri);
  });
});
