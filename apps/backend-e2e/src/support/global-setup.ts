import { waitForPortOpen } from '@nx/node/utils';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { exec } from 'child_process'; // For starting the backend
import { server } from './mocks/server'; // MSW server

module.exports = async function () {
  dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });

  server.listen({ onUnhandledRequest: 'bypass' }); // or 'error' or a custom function
  console.log('\nMSW Mock Server started.\n');

  console.log('\nSetting up backend server...\n');

  const backendPort = process.env.BACKEND_PORT || 3000;
  globalThis.__BACKEND_PROCESS__ = exec(
    `pnpm nx serve backend --port=${backendPort}`,
    { env: { ...process.env } }
  );

  globalThis.__BACKEND_PROCESS__.stdout?.on('data', (data) => {
    console.log(`Backend stdout: ${data}`);
  });

  globalThis.__BACKEND_PROCESS__.stderr?.on('data', (data) => {
    console.error(`Backend stderr: ${data}`);
  });

  const host = process.env.HOST ?? 'localhost';
  await waitForPortOpen(Number(backendPort), { host });
  console.log(`\nBackend server is ready on port ${backendPort}.\n`);

  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';
  globalThis.__BACKEND_PORT__ = backendPort; // Pass backend port for teardown
};
