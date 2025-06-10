require('dotenv').config({ path: './.env.test' });

module.exports = {
  testEnvironment: 'node',
  testTimeout: 15000,
  verbose: process.env.NODE_ENV !== 'production',
};
