import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCreateHero } from '../../hooks/heroes/useCreateHero';
import { useListHeroes } from '../../hooks/heroes/useListHeroes';
import { useRemoveHero } from '../../hooks/heroes/useRemoveHero';
import { getHeroDetailsEndpoint } from '../../router/endpoints';
import ErrorWrapper from '../error-wrapper/ErrorWrapper';
import './heroes.css';

function Heroes() {
	const [newHeroName, setNewHeroName] = useState<string>('');
	const {
		heroes,
		error: listError,
		isLoading: isListLoading,
	} = useListHeroes();
	const { isLoading: isCreating, createHero } = useCreateHero();
	const { isLoading: isRemoving, removeHero } = useRemoveHero();

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
		<>
			<h2>My Heroes</h2>
			<div>
				<label htmlFor="new-hero">Hero name: </label>
				<input id="new-hero" onChange={updateNewHeroName} />
				<button
					type="button"
					className="add-button"
					disabled={isCreating()}
					onClick={(_) => createHero(newHeroName)}
				>
					Add hero
				</button>
			</div>
			<ErrorWrapper error={listError()}>
				{isListLoading() ? (
					<div>Loading... </div>
				) : (
					<ul className="heroes">
						{heroes().map((hero) => {
							return (
								<li key={hero.id}>
									<Link to={getHeroDetailsEndpoint(hero.id)}>
										<span className="badge">{hero.id}</span>
										<span className="name">{hero.name}</span>
									</Link>
									<button
										type="button"
										className="delete"
										title="delete hero"
										disabled={isRemoving()}
										onClick={(_) => removeHero(hero.id)}
									>
										x
									</button>
								</li>
							);
						})}
					</ul>
				)}
			</ErrorWrapper>
		</>
	);
}

export default Heroes;
