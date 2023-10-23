import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Messages from '../messages/Messages';

function Root() {
	return (
		<QueryClientProvider client={new QueryClient()}>
			<Header />
			<Outlet />
			<Messages />
		</QueryClientProvider>
	);
}

export default Root;
