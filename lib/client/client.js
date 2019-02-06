class Client {
  constructor(http) {
    this.http = http;
  }

  getAccountInfo({
    userkey,
    uri,
  }) {
    const path = 'account';
    const method = 'get_packages_info';
    return this.http.post(`${uri}${path}`, {
      form: {
        method,
        userkey,
      },
    });
  }

  sendJobToCheck({
    userkey,
    uri,
  }, {
    text,
  }) {
    const path = 'post';
    return this.http.post(`${uri}${path}`, {
      form: {
        text,
        userkey,
      },
    });
  }

  getCheckResult({
    userkey,
    uri,
  }, uid) {
    const path = 'post';
    return this.http.post(`${uri}${path}`, {
      form: {
        uid,
        userkey,
        jsonvisible: 'detail',
      },
    });
  }
}

module.exports = Client;
