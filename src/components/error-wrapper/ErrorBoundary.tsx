import { Component, ContextType, ReactNode } from 'react';
import { MessagesContext } from '../../contexts/MessagesContext';
import './error-wrapper.css';

type ErrorProps = { children: ReactNode };
type ErrorState = { error: Error | null };

export class ErrorBoundary extends Component<ErrorProps, ErrorState> {
	declare context: ContextType<typeof MessagesContext>;

	constructor(props: ErrorProps) {
		super(props);
		this.state = { error: null };
	}

	static getDerivedStateFromError(error: Error) {
		return { error };
	}

	componentDidCatch(error: Error) {
		this.context.add(error.message);
	}

	render() {
		if (this.state.error !== null) {
			return (
				<div className="error-wrapper">
					<p>{this.state.error.message}</p>
				</div>
			);
		}

		return this.props.children;
	}
}
