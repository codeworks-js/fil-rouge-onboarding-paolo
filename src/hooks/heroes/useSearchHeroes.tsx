import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../api/fetcher';
import { Hero } from '../../types/Hero';
import { useMessagesContext } from '../useMessageContext';

interface ISearchHeroes {
	isLoading: boolean;
	error: Error | null;
	heroes: Hero[];
	search: () => void;
}

export function useSearchHeroes(pattern: string): ISearchHeroes {
	const { add: addMessage } = useMessagesContext();
	const { data, isRefetching, isLoading, error, refetch } = useQuery<
		Hero[],
		Error,
		Hero[],
		string[]
	>({
		queryKey: ['searchHeroes', pattern],
		queryFn: async ({ signal }) => searchHeroes(pattern, signal, addMessage),
		enabled: false,
		initialData: [],
	});

	return {
		isLoading: isLoading || isRefetching,
		error,
		heroes: data!,
		search: refetch,
	};
}

async function searchHeroes(
	pattern: string,
	signal: AbortSignal,
	notifier: (message: string) => void,
): Promise<Hero[]> {
	if (pattern === '') {
		return [];
	}

	try {
		notifier(`Searched heroes with pattern ${pattern}.`);
		const matchedHeroes = await fetcher.get<Hero[]>({
			url: new URL(
				`/heroes/search?term=${pattern}`,
				import.meta.env.VITE_API_URL,
			),
			signal,
		});
		return matchedHeroes;
	} catch (err) {
		console.error(err);
		throw new Error('Could not search heroes.');
	}
}
