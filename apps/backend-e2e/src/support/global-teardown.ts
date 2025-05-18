import { killPort } from '@nx/node/utils';
import { server } from './mocks/server'; // MSW server

module.exports = async function () {
  server.close();
  console.log('\nMSW Mock Server stopped.\n');

  if (globalThis.__BACKEND_PROCESS__) {
    console.log('Stopping backend server...');
    globalThis.__BACKEND_PROCESS__.kill();
  }

  const port = globalThis.__BACKEND_PORT__ || process.env.BACKEND_PORT || 3000;
  try {
    await killPort(Number(port));
    console.log(`Port ${port} killed successfully.`);
  } catch (error) {
    console.error(`Error killing port ${port}:`, error);
  }
  console.log(globalThis.__TEARDOWN_MESSAGE__);
};
