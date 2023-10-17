import { useEffect, useState } from 'react';
import { fetcher } from '../../api/fetcher';
import { Hero } from '../../types/Hero';
import { useError } from '../useError';
import { useLoader } from '../useLoader';
import { useMessagesContext } from '../useMessageContext';

interface IGetHero {
	isLoading: () => boolean;
	error: () => string | null;
	hero: () => Hero;
}

export function useGetHero(id: number): IGetHero {
	const [hero, setHero] = useState<Hero>({ id: 0, name: '' });
	const { isLoading, startLoading, stopLoading } = useLoader();
	const { error, setError } = useError();
	const { add: addMessage } = useMessagesContext();

	useEffect(() => {
		const getHero = async () => {
			try {
				startLoading();
				addMessage(`HeroService: fetched hero id=${id}`);

				const hero = await fetcher.get<Hero>({
					url: new URL(`/heroes/${id}`, import.meta.env.VITE_API_URL),
					headers: { Accept: 'application/json' },
				});
				setHero(hero);
			} catch (err) {
				const errorMessage = 'Could not get hero details.';
				addMessage(errorMessage);
				setError(errorMessage);
			} finally {
				stopLoading();
			}
		};

		getHero();
	}, []);

	return {
		isLoading,
		error,
		hero: () => hero,
	};
}
