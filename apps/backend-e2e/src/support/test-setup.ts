/* eslint-disable */
import axios from 'axios';
import { server } from './mocks/server'; // MSW server

// Establish API mocking before all tests.
beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

module.exports = async function () {
  // Configure axios for tests to use.
  // This should point to your *backend application's* URL, not the mock server's URL.
  const host = process.env.HOST ?? 'localhost';
  const port = process.env.BACKEND_PORT ?? '3000'; // Use the same port as in global-setup
  axios.defaults.baseURL = `http://${host}:${port}`;
  console.log(`Axios baseURL set to: ${axios.defaults.baseURL}`);
};
