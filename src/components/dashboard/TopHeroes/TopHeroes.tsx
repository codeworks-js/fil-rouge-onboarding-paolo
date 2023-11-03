import { useListHeroes } from '../../../hooks/heroes/useListHeroes';
import ErrorWrapper from '../../error-wrapper/ErrorWrapper';
import UnorderedItemList from '../../item-list/UnorderedItemList';
import TopHeroesItem from './TopHeroesItem';
import './top-heroes.css';

function TopHeroes() {
	const { heroes, isLoading, error } = useListHeroes();

	return (
		<ErrorWrapper error={error()}>
			{isLoading() ? (
				<div>Loading...</div>
			) : (
				<UnorderedItemList
					className="heroes-menu"
					emptyElement={() => <div>No top heroes.</div>}
					items={heroes().slice(1, 5)}
					builder={(topHero) => <TopHeroesItem topHero={topHero} />}
					keyGenerator={(hero) => hero.id}
				/>
			)}
		</ErrorWrapper>
	);
}

export default TopHeroes;
