import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';

type Options = Parameters<typeof render>[1];

export function renderWithContexts(ui: ReactNode, options?: Options) {
	return render(
		<QueryClientProvider
			client={
				new QueryClient({
					defaultOptions: {
						queries: { retry: false },
					},
				})
			}
		>
			{/* <MessagesProvider>{ui}</MessagesProvider> */}
			{ui}
		</QueryClientProvider>,
		options,
	);
}
