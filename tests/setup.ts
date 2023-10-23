import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { server } from './mock-server';

beforeAll(() => server.listen());

afterEach(() => {
	server.resetHandlers();
	cleanup();
});

afterAll(() => server.close());
