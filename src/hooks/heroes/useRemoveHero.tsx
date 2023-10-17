import { fetcher } from '../../api/fetcher';
import { useError } from '../useError';
import { useLoader } from '../useLoader';
import { useMessagesContext } from '../useMessageContext';

interface IRemoveHero {
	isLoading: () => boolean;
	error: () => string | null;
	removeHero: (id: number) => Promise<void>;
}

export function useRemoveHero(config: {
	onRemoved: (id: number) => void;
}): IRemoveHero {
	const { isLoading, startLoading, stopLoading } = useLoader();
	const { error, setError } = useError();
	const { add: addMessage } = useMessagesContext();

	const removeHero = async (id: number) => {
		try {
			startLoading();
			await fetcher.delete({
				url: new URL(`/heroes/${id}`, import.meta.env.VITE_API_URL),
			});
			config.onRemoved?.(id);
		} catch (err) {
			const errorMessage = 'Could not remove hero.';
			addMessage(errorMessage);
			setError(errorMessage);
		} finally {
			stopLoading();
		}
	};

	return {
		isLoading,
		error,
		removeHero,
	};
}
