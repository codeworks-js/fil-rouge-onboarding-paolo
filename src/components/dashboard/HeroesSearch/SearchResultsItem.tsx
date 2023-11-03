import { Link } from 'react-router-dom';
import { getHeroDetailsEndpoint } from '../../../router/endpoints';
import { Hero } from '../../../types/Hero';

type SearchResultsItemProps = {
	hero: Hero;
};

function SearchResultsItem({ hero }: SearchResultsItemProps) {
	return <Link to={getHeroDetailsEndpoint(hero.id)}>{hero.name}</Link>;
}

export default SearchResultsItem;
