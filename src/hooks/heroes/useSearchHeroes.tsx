import { useCallback, useState } from 'react';
import { fetcher } from '../../api/fetcher';
import { Hero } from '../../types/Hero';
import { useError } from '../useError';
import { useLoader } from '../useLoader';
import { useMessagesContext } from '../useMessageContext';

interface ISearchHeroes {
	isLoading: () => boolean;
	error: () => string | null;
	heroes: () => Hero[];
	searchTerm: (term: string) => void;
	refresh: () => void;
}

export function useSearchHeroes(initialTerm: string): ISearchHeroes {
	const [term, setTerm] = useState<string>(initialTerm);
	const [heroes, setHeroes] = useState<Hero[]>([]);
	const { isLoading, startLoading, stopLoading } = useLoader();
	const { error, setError, clear } = useError();
	const { add: addMessage } = useMessagesContext();

	const refresh = useCallback(() => {
		if (term === '') {
			return;
		}
		clear();

		const matchHeroes = async () => {
			try {
				startLoading();
				const matchedHeroes = await fetcher.get<Hero[]>({
					url: new URL(
						`/heroes/search?term=${term}`,
						import.meta.env.VITE_API_URL,
					),
				});
				setHeroes(matchedHeroes);
				addMessage(`Found ${matchedHeroes.length} result(s).`);
			} catch (err) {
				const errorMessage = 'Could not search heroes.';
				addMessage(errorMessage);
				setError(errorMessage);
			} finally {
				stopLoading();
			}
		};

		matchHeroes();
	}, [term]);

	return {
		isLoading,
		error,
		heroes: () => heroes,
		searchTerm: setTerm,
		refresh,
	};
}
