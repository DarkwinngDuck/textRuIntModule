const request = require('request-promise-native');
const Client = require('../lib');


describe('[TextRuIntegrationModule] Client', () => {
  let config;
  let ctx;
  let uid;
  let client;
  let uri;

  beforeEach(() => {
    config = {
      userkey: 'userkey',
    };
    ctx = {
      text: 'text',
    };
    uid = 'uid';
    uri = 'uri';
    client = new Client();
    client.uri = uri;
  });

  test('should create an instance', () => {
    expect(client).toBeDefined();
  });

  test('should send a request with expected params to get account info', () => {
    const fullUri = `${client.uri}account`;
    const params = {
      form: {
        method: 'get_packages_info',
        userkey: config.userkey,
      },
    };
    const spy = jest.spyOn(request, 'post');
    client.getAccountInfo(config);
    expect(spy).toHaveBeenCalledWith(fullUri, params);
  });

  test('should send a request with expected params to review text', () => {
    const fullUri = `${client.uri}post`;
    const params = {
      form: {
        text: ctx.text,
        userkey: config.userkey,
      },
    };
    const spy = jest.spyOn(request, 'post');
    client.sendJob(config, ctx);
    expect(spy).toHaveBeenCalledWith(fullUri, params);
  });

  test('should send a request with expected params to get result of review text', () => {
    const fullUri = `${client.uri}post`;
    const params = {
      form: {
        uid,
        userkey: config.userkey,
        jsonvisible: 'detail',
      },
    };
    const spy = jest.spyOn(request, 'post');
    client.getResult(config, uid);
    expect(spy).toHaveBeenCalledWith(fullUri, params);
  });
});
