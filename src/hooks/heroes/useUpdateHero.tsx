import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../../api/fetcher';
import { Hero } from '../../types/Hero';
import { useMessagesContext } from '../useMessageContext';

interface IUpdateHero {
	isLoading: boolean;
	error: string | null;
	updateHero: (hero: Hero) => void;
}

export function useUpdateHero(): IUpdateHero {
	const queryClient = useQueryClient();
	const { add: addMessage } = useMessagesContext();
	const { isPending, error, mutate } = useMutation({
		mutationFn: async (hero: Hero) => updateHero(hero, addMessage),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['heroes', 'hero'],
			});
		},
	});

	return {
		isLoading: isPending,
		error: error?.message || null,
		updateHero: mutate,
	};
}

async function updateHero(hero: Hero, notifier: (message: string) => void) {
	try {
		notifier(`Updated hero n°{hero.id}.`);

		await fetcher.put({
			url: new URL(`/heroes`, import.meta.env.VITE_API_URL),
			headers: { 'Content-Type': 'application/json' },
			body: hero,
		});
	} catch (err) {
		throw new Error('Could not modify hero details.');
	}
}
