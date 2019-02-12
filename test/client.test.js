const Client = require('../lib/client/client');

const http = {
  post() {},
};

describe('[TextRuIntegrationModule] Client', () => {
  let client;
  let config;
  let ctx;
  let uid;

  beforeEach(() => {
    config = {
      userkey: 'userkey',
      uri: 'uri/',
    };
    ctx = {
      text: 'text',
    };
    uid = 'uid';
    client = new Client(http);
  });

  test('should create an instance', () => {
    expect(client).toBeDefined();
  });

  test('should send a request with expected params to get account info', () => {
    const path = 'account';
    const fullUri = `${config.uri}${path}`;
    const params = {
      form: {
        method: 'get_packages_info',
        userkey: config.userkey,
      },
    };
    const spy = jest.spyOn(client.http, 'post');
    client.getAccountInfo(config);
    expect(spy).toHaveBeenCalledWith(fullUri, params);
  });

  test('should send a request with expected params to review text', () => {
    const path = 'post';
    const fullUri = `${config.uri}${path}`;
    const params = {
      form: {
        text: ctx.text,
        userkey: config.userkey,
      },
    };
    const spy = jest.spyOn(client.http, 'post');
    client.sendJobToCheck({
      ...config,
      ...ctx,
    });
    expect(spy).toHaveBeenCalledWith(fullUri, params);
  });

  test('should send a request with expected params to get result of review text', () => {
    const path = 'post';
    const fullUri = `${config.uri}${path}`;
    const params = {
      form: {
        uid,
        userkey: config.userkey,
        jsonvisible: 'detail',
      },
    };
    const spy = jest.spyOn(client.http, 'post');
    client.getCheckResult({ ...config, uid });
    expect(spy).toHaveBeenCalledWith(fullUri, params);
  });
});
