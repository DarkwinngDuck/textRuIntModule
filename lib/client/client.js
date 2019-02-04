const request = require('request-promise-native');

class Client {

  constructor(config = {}) {
    this.config = config;
    this.uri = 'http://api.text.ru/';
  }

  async getAccountInfo() {
    const route = 'account';
    const method = 'get_packages_info';
    const config = await this.getConfig();
    return request({
        method: 'POST',
        uri: `${this.uri}${route}`,
        formData: {
          method: method,
          userkey: config.userkey
        },
        json: true
      })
      .then(response => console.log('done', response))
      .catch(err => console.log(err));
  }

  async sendJob() {
    const route = 'post';
    const config = await this.getConfig();
    return request({
        method: 'POST',
        uri: `${this.uri}${route}`,
        formData: {
          text: config.text,
          userkey: config.userkey
        },
        json: true
      })
      .then(response => {
        this.uid = response.text_uid;
        console.log('done, uid: ', response.text_uid)
      })
      .catch(err => console.log(err));
  }

  async getResult() {
    const route = 'post';
    const config = await this.getConfig();
    const uid = this.uid ? this.uid : '5c5850f7e3293';
    return request({
        method: 'POST',
        uri: `${this.uri}${route}`,
        formData: {
          uid: uid,
          userkey: config.userkey,
          jsonvisible: 'detail',
        }
      })
      .then(response => console.log('done, result is: ', response.seo_check))
      .catch(err => console.log(err));
  }

  async getConfig() {
    return await this.config;
  }
}

module.exports = Client;