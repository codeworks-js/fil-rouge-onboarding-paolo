import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../../api/fetcher';
import { Hero } from '../../types/Hero';
import { useMessagesContext } from '../useMessageContext';

interface ICreateHero {
	isLoading: () => boolean;
	error: () => string | null;
	createHero: (name: string) => void;
}

export function useCreateHero(): ICreateHero {
	const messagesStore = useMessagesContext();
	const queryClient = useQueryClient();
	const { isPending, error, mutate } = useMutation<Hero, Error, string>({
		mutationFn: async (name) =>
			createHero(name, messagesStore.add.bind(messagesStore)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['heroes'] });
		},
	});

	return {
		isLoading: () => isPending,
		error: () => error?.message || null,
		createHero: mutate,
	};
}

async function createHero(
	name: string,
	notifier: (message: string) => void,
): Promise<Hero> {
	try {
		const hero = await fetcher.post<Hero>({
			url: new URL('/heroes', import.meta.env.VITE_API_URL),
			headers: { 'Content-Type': 'application/json' },
			body: { name },
		});
		notifier(`Created hero ${name}.`);
		return hero;
	} catch (_err) {
		throw new Error('Could not create hero.');
	}
}
