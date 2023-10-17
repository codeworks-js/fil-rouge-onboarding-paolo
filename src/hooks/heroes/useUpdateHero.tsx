import { fetcher } from '../../api/fetcher';
import { Hero } from '../../types/Hero';
import { useError } from '../useError';
import { useLoader } from '../useLoader';
import { useMessagesContext } from '../useMessageContext';

interface IUpdateHero {
	isLoading: boolean;
	error: string | null;
	updateHero: (hero: Hero) => Promise<void>;
}

export function useUpdateHero(): IUpdateHero {
	const { isLoading, startLoading, stopLoading } = useLoader();
	const { error, setError } = useError();
	const { add: addMessage } = useMessagesContext();

	const updateHero = async (hero: Hero): Promise<void> => {
		try {
			startLoading();
			await fetcher.put({
				url: new URL(`/heroes`, import.meta.env.VITE_API_URL),
				headers: { 'Content-Type': 'application/json' },
				body: hero,
			});
		} catch (err) {
			const errorMessage = 'Could not modify hero details.';
			addMessage(errorMessage);
			setError(errorMessage);
		} finally {
			stopLoading();
		}
	};

	return {
		isLoading: isLoading(),
		error: error(),
		updateHero,
	};
}
