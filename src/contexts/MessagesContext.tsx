import { createContext } from 'react';
import { MessageStore } from '../stores/MessageStore';

export const MessagesContext = createContext<MessageStore>(new MessageStore());
