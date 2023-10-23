export type FetcherParams = {
	url: URL;
	headers?: Record<string, string>;
	body?: Record<string, unknown>;
	signal?: AbortSignal;
};

export interface Fetcher {
	post<T = unknown>(params: FetcherParams): Promise<T>;
	get<T = unknown>(params: FetcherParams): Promise<T>;
	put(params: FetcherParams): Promise<void>;
	delete(params: FetcherParams): Promise<void>;
}
