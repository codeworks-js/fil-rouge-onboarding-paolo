import { useContext } from 'react';
import { MessagesContext } from '../contexts/MessagesContext';

export function useMessagesContext() {
	return useContext(MessagesContext);
}
