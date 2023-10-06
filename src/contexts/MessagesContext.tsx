import { ReactNode, createContext, useState } from 'react';

interface IMessageService {
	messages: readonly string[];
	add(message: string): void;
	isEmpty(): boolean;
	clear(): void;
}

export const MessagesContext = createContext<IMessageService>(
	null as unknown as IMessageService,
);

function MessagesProvider({ children }: { children: ReactNode }) {
	const [messages, setMessages] = useState<string[]>([]);

	const value: IMessageService = {
		messages: Object.freeze([...messages]),
		add: (message) => setMessages([...messages, message]),
		isEmpty: () => messages.length === 0,
		clear: () => setMessages([]),
	};

	return (
		<MessagesContext.Provider value={value}>
			{children}
		</MessagesContext.Provider>
	);
}

export default MessagesProvider;
