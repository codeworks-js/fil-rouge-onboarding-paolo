import { ChangeEventHandler, useState } from 'react';
import { useSearchHeroes } from '../../../hooks/heroes/useSearchHeroes';
import ErrorWrapper from '../../error-wrapper/ErrorWrapper';
import UnorderedItemList from '../../item-list/UnorderedItemList';
import SearchResultSkeleton from './SearchResultSkeleton';
import SearchResultsItem from './SearchResultsItem';
import './heroes-search.css';

const HeroesSearch = () => {
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
				{isLoading ? (
					<SearchResultSkeleton />
				) : (
					<UnorderedItemList
						className="search-result"
						emptyElement={() => <div>No match found.</div>}
						items={heroes}
						builder={(hero) => <SearchResultsItem hero={hero} />}
						keyGenerator={(hero) => hero.id}
					/>
				)}
			</ErrorWrapper>
		</div>
	);
};

export default HeroesSearch;
