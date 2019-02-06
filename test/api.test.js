const TextRuIntegrationModuleApi = require('../lib/api/api');

describe('[TextRuIntegrationModule] API', () => {
  let api;
  const client = {
    getAccountInfo() {},
    sendJobToCheck() {},
    getCheckResult() {},
  };
  const manager = {
    setConfiguration() {},
    getConfiguration() {},
    resetConfigurationsCache() {},
  };
  const storage = {
    save() {},
  };

  beforeEach(() => {
    api = new TextRuIntegrationModuleApi({
      client,
      manager,
    });
  });

  test('should create instance of TextRuIntegrationModule', () => {
    expect(api).toBeDefined();
  });

  test('should call manager\'s setConfiguration method', () => {
    const spy = jest.spyOn(manager, 'setConfiguration');
    const configs = [{}, {}];
    api.setConfigs(configs);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test('should setup storage', () => {
    const result = api.setStorage(storage);
    expect(result.storage).toBeDefined();
  });

  test('should call manager\'s resetConfigurationsCache method', () => {
    const spy = jest.spyOn(manager, 'resetConfigurationsCache');
    api.resetConfigs();
    expect(spy).toHaveBeenCalled();
  });

  test('should call manager\'s getConfiguration method', () => {
    const type = 'default';
    const spy = jest.spyOn(manager, 'getConfiguration');
    api.getConfig(type);
    expect(spy).toHaveBeenCalled();
  });

  test('should call client\'s getAccountInfo method', () => {
    const type = 'default';
    const spy = jest.spyOn(client, 'getAccountInfo');
    api.getInfo(type);
    expect(spy).toHaveBeenCalled();
  });

  test('should call client\'s sendJobToCheck method', () => {
    const spy = jest.spyOn(client, 'sendJobToCheck');
    jest.spyOn(api, 'getConfig').mockReturnValue({ userkey: 'uk', uri: 'uri' });
    api.sendJob('type', {
      text: 'text',
    });
    expect(spy).toHaveBeenCalled();
  });

  test('should call client\'s getCheckResult method', () => {
    const spy = jest.spyOn(client, 'getCheckResult');
    jest.spyOn(api, 'getConfig').mockReturnValue({ userkey: 'uk', uri: 'uri' });
    api.getResult('type', {
      uid: 'uid',
    });
    expect(spy).toHaveBeenCalled();
  });
});
