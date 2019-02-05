class Client {
  constructor(http) {
    this.http = http;
  }

  getAccountInfo({
    userkey,
    uri = 'http://api.text.ru/account',
  }) {
    const method = 'get_packages_info';
    return this.http.post(`${uri}`, {
      form: {
        method,
        userkey,
      },
    });
  }

  sendJob({
    userkey,
    uri = 'http://api.text.ru/post',
  }, {
    text,
  }) {
    return this.http.post(`${uri}`, {
      form: {
        text,
        userkey,
      },
    });
  }

  getResult({
    userkey,
    uri = 'http://api.text.ru/post',
  }, uid) {
    return this.http.post(`${uri}`, {
      form: {
        uid,
        userkey,
        jsonvisible: 'detail',
      },
    });
  }
}

module.exports = Client;
