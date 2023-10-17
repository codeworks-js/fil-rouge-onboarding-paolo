import { useState } from 'react';

interface IErrorService {
	error: () => string | null;
	setError: (error: string) => void;
	clear: () => void;
}

export function useError(): IErrorService {
	const [error, setError] = useState<string | null>(null);

	return {
		error: () => error,
		setError: (err: string) => setError(err),
		clear: () => setError(null),
	};
}
