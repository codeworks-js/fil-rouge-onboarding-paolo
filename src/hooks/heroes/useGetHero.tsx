import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../api/fetcher';
import { Hero } from '../../types/Hero';
import { useMessagesContext } from '../useMessageContext';

interface IGetHero {
	isLoading: () => boolean;
	error: () => string | null;
	hero: () => Hero;
}

export function useGetHero(id: number): IGetHero {
	const { add: addMessage } = useMessagesContext();
	const { data, isLoading, error } = useQuery<
		Hero,
		Error,
		Hero,
		[string, number]
	>({
		queryKey: ['hero', id],
		queryFn: async ({ signal }) => getHero(id, signal, addMessage),
	});

	return {
		isLoading: () => isLoading,
		error: () => error?.message || null,
		hero: () => data!,
	};
}

async function getHero(
	id: number,
	signal: AbortSignal,
	notifier: (message: string) => void,
): Promise<Hero> {
	try {
		notifier(`HeroService: fetched hero id=${id}`);

		const hero = await fetcher.get<Hero>({
			url: new URL(`/heroes/${id}`, import.meta.env.VITE_API_URL),
			headers: { Accept: 'application/json' },
			signal,
		});
		return hero;
	} catch (err) {
		throw new Error('Could not get hero details.');
	}
}
