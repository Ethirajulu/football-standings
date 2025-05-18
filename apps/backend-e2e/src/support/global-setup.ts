import { waitForPortOpen } from '@nx/node/utils';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { exec } from 'child_process'; // For starting the backend
import { server } from './mocks/server'; // MSW server

/* eslint-disable */
var __TEARDOWN_MESSAGE__: string;

module.exports = async function () {
  // Load .env.test file for environment variables
  dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });

  // Start the MSW mock server
  // Ensure it listens on the MOCK_API_HOST defined in handlers.ts (e.g., http://localhost:1234)
  server.listen({ onUnhandledRequest: 'bypass' }); // or 'error' or a custom function
  console.log('\nMSW Mock Server started.\n');

  // Start backend services that the app needs to run.
  console.log('\nSetting up backend server...\n');

  // Example: Start the backend server using Nx command
  // Adjust the command and port as per your backend application's configuration
  // The backend should pick up API_FOOTBALL_API_HOST from the .env.test file
  const backendPort = process.env.BACKEND_PORT || 3000; // Assuming your backend runs on port 3000
  globalThis.__BACKEND_PROCESS__ = exec(
    `pnpm nx serve backend --port=${backendPort}`,
    { env: { ...process.env } } // Ensure it inherits current env vars (including those from .env.test)
  );

  globalThis.__BACKEND_PROCESS__.stdout?.on('data', (data) => {
    console.log(`Backend stdout: ${data}`);
  });

  globalThis.__BACKEND_PROCESS__.stderr?.on('data', (data) => {
    console.error(`Backend stderr: ${data}`);
  });

  const host = process.env.HOST ?? 'localhost';
  // This waitForPortOpen should target your actual backend server, not the mock server
  await waitForPortOpen(Number(backendPort), { host });
  console.log(`\nBackend server is ready on port ${backendPort}.\n`);

  // Hint: Use `globalThis` to pass variables to global teardown.
  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';
  globalThis.__BACKEND_PORT__ = backendPort; // Pass backend port for teardown
};
