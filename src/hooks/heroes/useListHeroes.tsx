import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../api/fetcher';
import { Hero } from '../../types/Hero';
import { useMessagesContext } from '../useMessageContext';

interface IListHeroes {
	isLoading: () => boolean;
	error: () => string | null;
	heroes: () => Hero[];
}

export function useListHeroes(): IListHeroes {
	const messagesStore = useMessagesContext();
	const { data, isLoading, error } = useQuery<Hero[], Error, Hero[], string[]>({
		queryKey: ['heroes'],
		queryFn: async ({ signal }) =>
			getHeroes(signal, messagesStore.add.bind(messagesStore)),
	});

	return {
		isLoading: () => isLoading,
		error: () => error?.message || null,
		heroes: () => data!,
	};
}

async function getHeroes(
	signal: AbortSignal,
	notifier: (message: string) => void,
): Promise<Hero[]> {
	try {
		notifier('Fetched heroes.');

		const heroList = await fetcher.get<Hero[]>({
			url: new URL('/heroes', import.meta.env.VITE_API_URL),
			signal,
		});
		return heroList;
	} catch (_err) {
		throw new Error('Could not retrieve heroes.');
	}
}
