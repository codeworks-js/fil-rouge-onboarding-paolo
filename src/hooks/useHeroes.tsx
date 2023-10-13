import { useContext, useState } from 'react';
import { fetcher } from '../api/fetcher';
import { MessagesContext } from '../contexts/MessagesContext';
import { Hero } from '../types/Hero';

interface IHeroesService {
	isLoading: () => boolean;
	error: () => string | null;
	addHero(name: string): Promise<Hero>;
	getHero(id: number): Promise<Hero>;
	getHeroes(): Promise<Hero[]>;
	removeHero(id: number): Promise<void>;
	searchHeroes(term: string): Promise<Hero[]>;
	updateHero(hero: Hero): Promise<void>;
}

function useHeroesService(): IHeroesService {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const { add: addMessage } = useContext(MessagesContext);

	const getHeroes = async (): Promise<Hero[]> => {
		setIsLoading(true);
		setError(null);
		addMessage('HeroService: fetched heroes');

		return fetcher
			.get<Hero[]>({ url: new URL('/heroes', import.meta.env.VITE_API_URL) })
			.catch((err) => {
				console.error(err);
				const errorMessage = 'Could not retrieve heroes.';
				addMessage(errorMessage);
				setError(errorMessage);
				return [];
			})
			.finally(() => setIsLoading(false));
	};

	const getHero = async (id: number): Promise<Hero> => {
		setIsLoading(true);
		setError(null);
		addMessage(`HeroService: fetched hero id=${id}`);

		return fetcher
			.get<Hero>({
				url: new URL(`/heroes/${id}`, import.meta.env.VITE_API_URL),
			})
			.catch((_) => {
				const errorMessage = 'Could not get hero details.';
				addMessage(errorMessage);
				setError(errorMessage);
				return {
					id: 0,
					name: '',
				};
			})
			.finally(() => setIsLoading(false));
	};

	const updateHero = async (hero: Hero): Promise<void> => {
		setIsLoading(true);
		setError(null);

		await fetcher
			.put({
				url: new URL(`/heroes`, import.meta.env.VITE_API_URL),
				body: hero,
			})
			.catch((_) => {
				const errorMessage = 'Could not modify hero details.';
				addMessage(errorMessage);
				setError(errorMessage);
			})
			.finally(() => setIsLoading(false));
	};

	const addHero = async (name: string): Promise<Hero> => {
		setIsLoading(true);
		setError(null);

		return fetcher
			.post<Hero>({
				url: new URL('/heroes', import.meta.env.VITE_API_URL),
				body: { name },
			})
			.then((hero) => {
				addMessage(`Hero '${name}' created.`);
				return hero;
			})
			.catch((_) => {
				const errorMessage = 'Could not create hero.';
				addMessage(errorMessage);
				setError(errorMessage);
				return {
					id: 0,
					name: '',
				};
			})
			.finally(() => setIsLoading(false));
	};

	const removeHero = async (id: number): Promise<void> => {
		setIsLoading(true);
		setError(null);

		await fetcher
			.delete({
				url: new URL(`/heroes/${id}`, import.meta.env.VITE_API_URL),
			})
			.then(() => addMessage(`Hero w/ id '${id}' removed.`))
			.catch((_) => {
				const errorMessage = 'Could not remove hero.';
				addMessage(errorMessage);
				setError(errorMessage);
			})
			.finally(() => setIsLoading(false));
	};

	const searchHeroes = async (term: string): Promise<Hero[]> => {
		setIsLoading(true);
		setError(null);

		const matchedHeroes = await fetcher
			.get<Hero[]>({
				url: new URL(
					`/heroes/search?term=${term}`,
					import.meta.env.VITE_API_URL,
				),
			})
			.catch((_) => {
				const errorMessage = 'Could not search heroes.';
				addMessage(errorMessage);
				setError(errorMessage);
				return [];
			})
			.finally(() => setIsLoading(false));

		addMessage(`Found ${matchedHeroes.length} result(s).`);
		return matchedHeroes;
	};

	return {
		isLoading: () => isLoading,
		error: () => error,
		addHero,
		getHero,
		getHeroes,
		removeHero,
		searchHeroes,
		updateHero,
	};
}

export default useHeroesService;
