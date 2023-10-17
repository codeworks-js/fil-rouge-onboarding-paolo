import { useEffect, useState } from 'react';
import { fetcher } from '../../api/fetcher';
import { Hero } from '../../types/Hero';
import { useError } from '../useError';
import { useLoader } from '../useLoader';
import { useMessagesContext } from '../useMessageContext';

interface IListHeroes {
	isLoading: () => boolean;
	error: () => string | null;
	append: (hero: Hero) => void;
	heroes: () => Hero[];
	removeById: (id: number) => void;
}

export function useListHeroes(): IListHeroes {
	const [heroes, setHeroes] = useState<Hero[]>([]);
	const { isLoading, startLoading, stopLoading } = useLoader();
	const { error, setError } = useError();
	const { add: addMessage } = useMessagesContext();

	useEffect(() => {
		const listHeroes = async () => {
			try {
				startLoading();
				addMessage('HeroService: fetched heroes');

				const heroList = await fetcher.get<Hero[]>({
					url: new URL('/heroes', import.meta.env.VITE_API_URL),
				});
				setHeroes(heroList);
			} catch (err) {
				const errorMessage = 'Could not retrieve heroes.';
				addMessage(errorMessage);
				setError(errorMessage);
			} finally {
				stopLoading();
			}
		};

		listHeroes();
	}, []);

	return {
		isLoading,
		error,
		append: (hero: Hero) => setHeroes([...heroes, hero]),
		heroes: () => heroes,
		removeById: (id: number) =>
			setHeroes(heroes.filter((hero) => hero.id !== id)),
	};
}
