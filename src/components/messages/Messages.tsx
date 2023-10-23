import { observer } from 'mobx-react-lite';
import { useMessagesContext } from '../../hooks/useMessageContext';
import './messages.css';

const Messages = observer(() => {
	const store = useMessagesContext();

	if (store.isEmpty) {
		return <div>No messages.</div>;
	}

	return (
		<>
			<button type="button" className="clear" onClick={store.clear.bind(store)}>
				Clear messages
			</button>
			{store.messages.map((message) => (
				<div key={crypto.randomUUID()}> {message} </div>
			))}
		</>
	);
});

export default Messages;
