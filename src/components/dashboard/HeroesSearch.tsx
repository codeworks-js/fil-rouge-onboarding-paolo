import { ChangeEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { useSearchHeroes } from '../../hooks/heroes/useSearchHeroes';
import { getHeroDetailsEndpoint } from '../../router/endpoints';
import ErrorWrapper from '../error-wrapper/ErrorWrapper';
import SearchResultSkeleton from './SearchResultSkeleton';
import './heroes-search.css';

function HeroesSearch() {
	const { heroes, refresh, searchTerm, isLoading, error } = useSearchHeroes('');

	const onSearchInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		const newTerm = event.target.value;
		searchTerm(newTerm);
		console.log('new term', newTerm);
	};

	const onSearchSubmit = async (): Promise<void> => {
		refresh();
	};

	return (
		<div id="search-component">
			<label htmlFor="search-box">Hero search</label>
			<input id="search-box" onChange={onSearchInputChange} />
			<button disabled={isLoading()} onClick={onSearchSubmit}>
				Submit
			</button>
			<ErrorWrapper error={error()}>
				<ul className="search-result">
					{isLoading() ? (
						<SearchResultSkeleton />
					) : (
						heroes().map((hero) => {
							return (
								<li key={crypto.randomUUID()}>
									<Link to={getHeroDetailsEndpoint(hero.id)}>{hero.name}</Link>
								</li>
							);
						})
					)}
				</ul>
			</ErrorWrapper>
		</div>
	);
}

export default HeroesSearch;
