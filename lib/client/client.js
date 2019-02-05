const request = require('request-promise-native');

class Client {
  constructor() {
    this.uri = 'http://api.text.ru/';
  }

  getAccountInfo(config) {
    const route = 'account';
    const method = 'get_packages_info';
    const {
      userkey,
    } = config;
    return request.post(`${this.uri}${route}`, {
      form: {
        method,
        userkey,
      },
    });
  }

  sendJob(config, ctx) {
    const route = 'post';
    const {
      userkey,
    } = config;
    const {
      text,
    } = ctx;
    return request
      .post(`${this.uri}${route}`, {
        form: {
          text,
          userkey,
        },
      });
  }

  getResult(config, uid) {
    const route = 'post';
    const {
      userkey,
    } = config;
    return request
      .post(`${this.uri}${route}`, {
        form: {
          uid,
          userkey,
          jsonvisible: 'detail',
        },
      });
  }
}

module.exports = Client;
