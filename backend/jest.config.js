require('dotenv').config({ path: './.env.test' });

module.exports = {
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  testTimeout: 15000,
  verbose: process.env.NODE_ENV !== 'production',
};
