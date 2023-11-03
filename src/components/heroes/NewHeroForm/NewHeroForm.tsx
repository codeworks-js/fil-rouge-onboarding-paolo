import { useState } from 'react';
import { useCreateHero } from '../../../hooks/heroes/useCreateHero';
import './new-hero-form.css';

function NewHeroForm() {
	const [newHeroName, setNewHeroName] = useState<string>('');
	const { isLoading, createHero } = useCreateHero();

	const updateNewHeroName: React.ChangeEventHandler<HTMLInputElement> = (
		event,
	) => {
		const newName = event.target.value;
		if (newName.length === 0) {
			return;
		}
		setNewHeroName(newName);
	};

	return (
		<div>
			<label htmlFor="new-hero">Hero name: </label>
			<input id="new-hero" onChange={updateNewHeroName} />
			<button
				type="button"
				className="add-button"
				disabled={isLoading()}
				onClick={(_) => createHero(newHeroName)}
			>
				Add hero
			</button>
		</div>
	);
}

export default NewHeroForm;
