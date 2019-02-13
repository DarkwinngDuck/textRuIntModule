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
      json: true,
    });
  }

  sendJobToCheck({
    userkey,
    uri,
    text,
  }) {
    const path = 'post';
    return this.http.post(`${uri}${path}`, {
      form: {
        text,
        userkey,
      },
      json: true,
    });
  }

  getCheckResult({
    userkey,
    uri,
    uid,
  }) {
    const path = 'post';
    return this.http.post(`${uri}${path}`, {
      form: {
        uid,
        userkey,
        jsonvisible: 'detail',
      },
      json: true,
    });
  }
}

module.exports = Client;
