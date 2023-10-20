import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const server = setupServer(
	rest.get(import.meta.env.VITE_API_URL + 'heroes/search', (_, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json([
				{ id: 10, name: 'Amanda' },
				{ id: 22, name: 'Kate' },
			]),
		);
	}),
);
