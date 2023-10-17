import { useState } from 'react';

interface ILoader {
	isLoading: () => boolean;
	startLoading: () => void;
	stopLoading: () => void;
}

export function useLoader(initialLoadingState?: boolean): ILoader {
	const [isLoading, setIsLoading] = useState<boolean>(
		initialLoadingState || false,
	);

	return {
		isLoading: () => isLoading,
		startLoading: () => setIsLoading(true),
		stopLoading: () => setIsLoading(false),
	};
}
