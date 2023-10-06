import { Fetcher, FetcherParams } from '../services/Fetcher';

type AcceptedMethods = 'POST' | 'GET' | 'PUT' | 'DELETE';

export const fetcher: Fetcher = {
	async post<T>(params: FetcherParams): Promise<T> {
		return innerHttpCall('POST', params, 'POST failed.');
	},

	async get<T>(params: FetcherParams): Promise<T> {
		return innerHttpCall('GET', params, 'GET failed.');
	},

	async put<T>(params: FetcherParams): Promise<T> {
		return innerHttpCall('PUT', params, 'PUT failed.');
	},

	async delete<T>(params: FetcherParams): Promise<T> {
		return innerHttpCall('DELETE', params, 'DELETE failed.');
	},
};

async function innerHttpCall<T>(
	method: AcceptedMethods,
	params: FetcherParams,
	errorMessage?: string,
): Promise<T> {
	const response = await fetch(params.url, {
		method,
		body: params.body ? JSON.stringify(params.body) : undefined,
	});
	if (!response.ok) {
		throw new Error(
			errorMessage || `Could not fetch ${method} ${params.url.toString()}`,
		);
	}

	return response.json();
}
