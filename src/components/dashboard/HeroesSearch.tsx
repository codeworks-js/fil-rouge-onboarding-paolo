import { observer } from 'mobx-react-lite';
import { ChangeEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearchHeroes } from '../../hooks/heroes/useSearchHeroes';
import { getHeroDetailsEndpoint } from '../../router/endpoints';
import ErrorWrapper from '../error-wrapper/ErrorWrapper';
import SearchResultSkeleton from './SearchResultSkeleton';
import './heroes-search.css';

const HeroesSearch = observer(() => {
	const [pattern, setPattern] = useState<string>('');
	const { heroes, search, isLoading, error } = useSearchHeroes(pattern);

	const onSearchInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		const newTerm = event.target.value;
		setPattern(newTerm);
	};

	const onSearchSubmit = async (): Promise<void> => {
		search();
	};

	return (
		<div id="search-component">
			<label htmlFor="search-box">Hero search</label>
			<input id="search-box" onChange={onSearchInputChange} />
			<button disabled={isLoading} onClick={onSearchSubmit}>
				Submit
			</button>
			<ErrorWrapper error={error?.message || null}>
				<ul className="search-result">
					{isLoading ? (
						<SearchResultSkeleton />
					) : (
						heroes.map((hero) => (
							<li key={crypto.randomUUID()}>
								<Link to={getHeroDetailsEndpoint(hero.id)}>{hero.name}</Link>
							</li>
						))
					)}
				</ul>
			</ErrorWrapper>
		</div>
	);
});

export default HeroesSearch;
