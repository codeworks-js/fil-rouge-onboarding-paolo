import { useMessagesContext } from '../../hooks/useMessageContext';
import './messages.css';

function Messages() {
	const { messages, clear, isEmpty } = useMessagesContext();

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
