import { useContext } from 'react';
import './messages.css';
import { MessagesContext } from '../../contexts/MessagesContext';

function Messages() {
	const { messages, clear, isEmpty } = useContext(MessagesContext);

	if (isEmpty()) {
		return <></>;
	}

	return (
		<>
			<button type="button" className="clear" onClick={(_) => clear()}>
				Clear messages
			</button>
			{messages.map((message) => (
				<div key={crypto.randomUUID()}> {message} </div>
			))}
		</>
	);
}

export default Messages;
