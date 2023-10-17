import { rest } from 'msw';
import { Hero } from '../types/Hero';
import { HEROES } from './heroes-data';

export const handlers = [
	rest.post('http://localhost:5174/heroes', async (req, res, ctx) => {
		const { name } = await req.json();

		const newHero: Hero = {
			id: generateId(),
			name,
		};
		HEROES.set(newHero.id, newHero);

		return res(ctx.status(201), ctx.delay(2000), ctx.json(newHero));
	}),

	rest.get('http://localhost:5174/heroes/search', async (req, res, ctx) => {
		const term = req.url.searchParams.get('term') || '';
		if (term === '') {
			return res(ctx.status(200), ctx.delay(3000), ctx.json([]));
		}

		// return an error 50% of the time
		const rand = Math.random();
		if (rand < 0.5) {
			return res(ctx.status(500), ctx.delay(3000));
		}

		const matches = Array.from(HEROES.values()).filter((hero) =>
			hero.name.toLowerCase().includes(term),
		);
		return res(ctx.status(200), ctx.delay(3000), ctx.json(matches));
	}),

	rest.get('http://localhost:5174/heroes/:id', (req, res, ctx) => {
		const heroId = Number(String(req.params.id));
		const hero = HEROES.get(heroId);

		if (hero === undefined) {
			return res(
				ctx.status(404),
				ctx.delay(2000),
				ctx.json({ message: `Hero n°${heroId} not found.` }),
			);
		}

		return res(ctx.delay(2000), ctx.json(hero));
	}),

	rest.get('http://localhost:5174/heroes', (_, res, ctx) => {
		return res(ctx.delay(2000), ctx.json(Array.from(HEROES.values())));
	}),

	rest.put('http://localhost:5174/heroes', async (req, res, ctx) => {
		const hero = await req.json<Hero>();
		HEROES.set(hero.id, hero);
		return res(ctx.status(200), ctx.delay(2000));
	}),

	rest.delete('http://localhost:5174/heroes/:id', (req, res, ctx) => {
		const heroId = Number(String(req.params.id));
		HEROES.delete(heroId);
		return res(ctx.status(204), ctx.delay(2000));
	}),
];

function generateId(): number {
	return HEROES.size > 0 ? Math.max(...HEROES.keys()) + 1 : 11;
}
