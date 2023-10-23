import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../../api/fetcher';
import { useMessagesContext } from '../useMessageContext';

interface IRemoveHero {
	isLoading: () => boolean;
	error: () => string | null;
	removeHero: (id: number) => void;
}

export function useRemoveHero(): IRemoveHero {
	const queryClient = useQueryClient();
	const { add: addMessage } = useMessagesContext();
	const { error, isPending, mutate } = useMutation({
		mutationFn: async (id: number) => removeHero(id, addMessage),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['heroes'] });
		},
	});

	return {
		isLoading: () => isPending,
		error: () => error?.message || null,
		removeHero: mutate,
	};
}

async function removeHero(id: number, notifier: (message: string) => void) {
	try {
		notifier(`Removing hero n°${id}.`);
		await fetcher.delete({
			url: new URL(`/heroes/${id}`, import.meta.env.VITE_API_URL),
		});
	} catch (_err) {
		throw new Error('Could not remove hero.');
	}
}
