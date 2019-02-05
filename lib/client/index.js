const http = require('request-promise-native');
const Client = require('./client');

module.exports = new Client(http);
