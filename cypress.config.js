/** @format */

require('dotenv').config();
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  env: {
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    REQRES_BASE_URL: process.env.REQRES_BASE_URL,
    REQRES_API_KEY: process.env.REQRES_API_KEY,
  },
  e2e: {
    baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,
    requestTimeout: 8000,
    responseTimeout: 8000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  screenshotOnRunFailure: true,
  video: false,
});
