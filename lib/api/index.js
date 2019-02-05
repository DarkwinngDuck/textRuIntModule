const client = require('../client');
const manager = require('../config-manager');
const TextRuIntegrationModuleApi = require('./api');

module.exports = new TextRuIntegrationModuleApi({ client, manager });
