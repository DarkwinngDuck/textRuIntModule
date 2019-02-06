const TextRuIntegrationModuleApi = require('../lib/api/api');

describe('[TextRuIntegrationModule] API', () => {
  let api;
  const client = {
    getAccountInfo() {},
    sendJob() {},
    getResult() {},
  };
  const manager = {
    setConfig() {},
    getConfig() {},
    getConfigsTypes() {},
    resetConfigsCache() {},
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

  test('should setup storage', () => {
    const storage = {
      save() {},
    };
    const result = api.setupStorage(storage);
    expect(result.storage).toBeDefined();
  });

  test('should call manager\'s setConfig method', () => {
    const spy = jest.spyOn(manager, 'setConfig');
    const configs = [{}];
    api.setupConfigs(configs);
    expect(spy).toHaveBeenCalled();
  });

  test('should call manager\'s resetConfigsCache method', () => {
    const spy = jest.spyOn(manager, 'resetConfigsCache');
    api.resetConfigs();
    expect(spy).toHaveBeenCalled();
  });

  test('should call manager\'s getConfiguration method', () => {
    const type = 'default';
    const spy = jest.spyOn(manager, 'getConfig');
    api.getConfiguration(type);
    expect(spy).toHaveBeenCalled();
  });

  test('should call client\'s getAccountInfo method', () => {
    const type = 'default';
    const spy = jest.spyOn(client, 'getAccountInfo');
    api.getAccInfo(type);
    expect(spy).toHaveBeenCalled();
  });

  test('should call client\'s sendJob method', () => {
    const spy = jest.spyOn(client, 'sendJob');
    jest.spyOn(api, 'getConfiguration').mockReturnValue({ userkey: 'uk', uri: 'uri'});
    api.sendJobToCheck('type', {
      text: 'text',
    });
    expect(spy).toHaveBeenCalled();
  });

  test('should call client\'s getResult method', () => {
    const spy = jest.spyOn(client, 'getResult');
    jest.spyOn(api, 'getConfiguration').mockReturnValue({ userkey: 'uk', uri: 'uri'});
    api.getCheckResult('type', {
      uid: 'uid',
    });
    expect(spy).toHaveBeenCalled();
  });
});
