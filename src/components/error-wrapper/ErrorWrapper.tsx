import { ReactNode } from 'react';
import './error-wrapper.css';

type ErrorWrapperProps = {
	error: string | null;
	children: ReactNode;
};

function ErrorWrapper({ error, children }: ErrorWrapperProps) {
	if (error) {
		return (
			<div className="error-wrapper">
				<p>{error}</p>
			</div>
		);
	}

	return <>{children}</>;
}

export default ErrorWrapper;
