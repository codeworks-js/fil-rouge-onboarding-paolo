import { useState } from 'react';
import { useError } from './useError';
import { useLoader } from './useLoader';

interface IFetch<T> {
	isLoading: () => boolean;
	error: () => string | null;
	data: () => T;
	sendRequest: (params: FetcherParams) => Promise<void>;
}

type FetcherParams = {
	url: URL;
	method: 'POST' | 'GET' | 'PUT' | 'DELETE';
	headers?: Record<string, string>;
	body?: Record<string, unknown>;
};

export function useFetch<T>(): IFetch<T> {
	const { isLoading, startLoading, stopLoading } = useLoader();
	const { error, setError, clearError } = useError();
	const [response, setResponse] = useState<T | null>(null);

	const sendRequest = async (params: FetcherParams, errorMessage?: string) => {
		clearError();

		try {
			startLoading();
			const response = await fetch(params.url.toString(), {
				method: params.method,
				headers: params.headers,
				body: params.body ? JSON.stringify(params.body) : undefined,
			});

			if (!response.ok) {
				const err =
					errorMessage ||
					`Could not fetch ${params.method} ${params.url.toString()}`;
				setError(err);
				return;
			}
		} catch (err) {
			setError((err as Error).message);
		} finally {
			stopLoading();
		}
	};

	return {
		isLoading,
		error,
		data: () => response,
		sendRequest,
	};
}
