export type FetcherParams = {
    url: URL,
    body?: Record<string, unknown>
}

export interface Fetcher {
    post<T = unknown>(params: FetcherParams): Promise<T>;
    get<T = unknown>(params: FetcherParams): Promise<T>;
    put(params: FetcherParams): Promise<void>;
    delete(params: FetcherParams): Promise<void>;
}