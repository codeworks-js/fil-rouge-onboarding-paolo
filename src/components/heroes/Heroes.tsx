import useHeroesService from '../../hooks/useHeroes';
import { Link } from 'react-router-dom';
import './heroes.css';
import { useEffect, useState } from 'react';
import { Hero } from '../../types/Hero';
import { getHeroDetailsEndpoint } from '../../router/endpoints';

function Heroes() {
	const { getHeroes, addHero, removeHero } = useHeroesService();
	const [heroes, setHeroes] = useState<Hero[]>([]);
	const [newHeroName, setNewHeroName] = useState<string>('');

	const updateNewHeroName: React.ChangeEventHandler<HTMLInputElement> = (
		event,
	) => {
		const newName = event.target.value;
		if (newName.length === 0) {
			return;
		}
		setNewHeroName(newName);
	};

	const submitNewHero = async (name: string): Promise<void> => {
		const newHero = await addHero(name);
		if (newHero.id === -1) {
			return;
		}
		setHeroes([...heroes, newHero]);
	};

	const submitHeroRemoval = async (id: number): Promise<void> => {
		await removeHero(id);
		setHeroes(heroes.filter((hero) => hero.id !== id));
	};

	useEffect(() => {
		const fetchHeroes = async () => {
			const heroes = await getHeroes();
			setHeroes(heroes);
		};
		fetchHeroes();
	}, []);

	return (
		<>
			<h2>My Heroes</h2>
			<div>
				<label htmlFor="new-hero">Hero name: </label>
				<input id="new-hero" onChange={updateNewHeroName} />
				<button
					type="button"
					className="add-button"
					onClick={(_) => submitNewHero(newHeroName)}
				>
					Add hero
				</button>
			</div>
			<ul className="heroes">
				{heroes.map((hero) => {
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
								onClick={(_) => submitHeroRemoval(hero.id)}
							>
								x
							</button>
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default Heroes;
