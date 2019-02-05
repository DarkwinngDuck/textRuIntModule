class Config {
  constructor({
    userkey = '',
    uri = 'http://api.text.ru/',
  }) {
    this.userkey = userkey;
    this.uri = uri;
  }
}

module.exports = Config;
