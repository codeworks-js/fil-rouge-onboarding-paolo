import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import MessagesProvider from '../../contexts/MessagesContext';
import Header from '../header/Header';
import Messages from '../messages/Messages';

function Root() {
	return (
		<QueryClientProvider client={new QueryClient()}>
			<Header />
			<MessagesProvider>
				<Outlet />
				<Messages />
			</MessagesProvider>
		</QueryClientProvider>
	);
}

export default Root;
