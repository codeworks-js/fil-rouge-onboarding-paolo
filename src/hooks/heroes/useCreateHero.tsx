import { fetcher } from '../../api/fetcher';
import { Hero } from '../../types/Hero';
import { useError } from '../useError';
import { useLoader } from '../useLoader';
import { useMessagesContext } from '../useMessageContext';

interface ICreateHero {
	isLoading: () => boolean;
	error: () => string | null;
	createHero: (name: string) => Promise<void>;
}

export function useCreateHero(config: {
	onCreated?: (hero: Hero) => void;
}): ICreateHero {
	const { isLoading, startLoading, stopLoading } = useLoader();
	const { error, setError } = useError();
	const { add: addMessage } = useMessagesContext();

	const createHero = async (name: string) => {
		try {
			startLoading();
			const hero = await fetcher.post<Hero>({
				url: new URL('/heroes', import.meta.env.VITE_API_URL),
				headers: { 'Content-Type': 'application/json' },
				body: { name },
			});
			config.onCreated?.(hero);
		} catch (err) {
			const errorMessage = 'Could not create hero.';
			addMessage(errorMessage);
			setError(errorMessage);
		} finally {
			stopLoading();
		}
	};

	return {
		isLoading,
		error,
		createHero,
	};
}
