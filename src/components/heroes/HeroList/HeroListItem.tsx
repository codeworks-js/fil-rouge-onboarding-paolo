import { Link } from 'react-router-dom';
import { useRemoveHero } from '../../../hooks/heroes/useRemoveHero';
import { getHeroDetailsEndpoint } from '../../../router/endpoints';
import { Hero } from '../../../types/Hero';

type HeroListItemProps = {
	hero: Hero;
};

function HeroListItem({ hero }: HeroListItemProps) {
	const { isLoading, removeHero } = useRemoveHero();

	return (
		<>
			<Link to={getHeroDetailsEndpoint(hero.id)}>
				<span className="badge">{hero.id}</span>
				<span className="name">{hero.name}</span>
			</Link>
			<button
				type="button"
				className="delete"
				title="delete hero"
				disabled={isLoading()}
				onClick={(_) => removeHero(hero.id)}
			/>
		</>
	);
}

export default HeroListItem;
