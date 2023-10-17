import { ChangeEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateHero } from '../../hooks/heroes/useUpdateHero';
import { Hero } from '../../types/Hero';

type HeroFormProps = {
	initiaHero: Hero;
};

function HeroForm({ initiaHero }: HeroFormProps) {
	const [currentName, setCurrentName] = useState<string>(initiaHero.name);
	const { updateHero, isLoading } = useUpdateHero();
	const navigate = useNavigate();

	const goBack = () => navigate(-1);

	const updateHeroName: ChangeEventHandler<HTMLInputElement> = (event) => {
		setCurrentName(event.target.value);
	};

	const save = async () => {
		await updateHero({
			id: initiaHero.id,
			name: currentName,
		});
		goBack();
	};

	return (
		<>
			<h2>{currentName.toUpperCase()} Details</h2>
			<div>
				<span>id: </span>
				{initiaHero.id}
			</div>
			<div>
				<label htmlFor="name">Hero name: </label>
				<input
					id="name"
					type="text"
					value={currentName}
					placeholder="name"
					onChange={updateHeroName}
				/>
			</div>
			<button type="button" onClick={goBack} disabled={isLoading}>
				go back
			</button>
			<button type="button" onClick={save} disabled={isLoading}>
				Save
			</button>
		</>
	);
}

export default HeroForm;
