import { Link } from 'react-router-dom';
import { Hero } from '../../../types/Hero';

type TopHeroesItemProps = {
	topHero: Hero;
};

function TopHeroesItem({ topHero }: TopHeroesItemProps) {
	return (
		<Link key={crypto.randomUUID()} to={`/detail/${topHero.id}`}>
			{topHero.name}
		</Link>
	);
}

export default TopHeroesItem;
