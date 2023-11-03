import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
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
	const messagesStore = useMessagesContext();
	const notify = useCallback(
		(message: string) => messagesStore.add(message),
		[],
	);
	const { data, isRefetching, isLoading, error, refetch } = useQuery<
		Hero[],
		Error,
		Hero[],
		string[]
	>({
		queryKey: ['searchHeroes'],
		queryFn: async ({ signal }) => searchHeroes(pattern, signal, notify),
		enabled: false,
		initialData: [],
	});

	return {
		isLoading: isLoading || isRefetching,
		error: (!isLoading && error) || null,
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
