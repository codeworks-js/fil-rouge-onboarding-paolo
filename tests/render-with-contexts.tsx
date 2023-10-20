import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import MessagesProvider from '../src/contexts/MessagesContext';

type Options = Parameters<typeof render>[1];

export function renderWithContexts(ui: ReactNode, options?: Options) {
	return render(<MessagesProvider>{ui}</MessagesProvider>, options);
}
