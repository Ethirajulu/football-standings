import axios from 'axios';
import { server } from './mocks/server';

// Configure Axios base URL
const host = process.env.HOST ?? 'localhost';
const port = process.env.BACKEND_PORT ?? '3000';
axios.defaults.baseURL = `http://${host}:${port}`;

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
