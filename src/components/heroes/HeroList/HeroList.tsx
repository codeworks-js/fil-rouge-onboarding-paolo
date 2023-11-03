import { useListHeroes } from '../../../hooks/heroes/useListHeroes';
import ErrorWrapper from '../../error-wrapper/ErrorWrapper';
import UnorderedItemList from '../../item-list/UnorderedItemList';
import HeroListItem from './HeroListItem';
import './hero-list.css';

function HeroList() {
	const { heroes, error, isLoading } = useListHeroes();

	return (
		<ErrorWrapper error={error()}>
			{isLoading() ? (
				<div>Loading... </div>
			) : (
				<UnorderedItemList
					builder={(hero) => <HeroListItem hero={hero} />}
					keyGenerator={(hero) => hero.id}
					items={heroes()}
					className="heroes"
					emptyElement={() => <div>No heroes found.</div>}
				/>
			)}
		</ErrorWrapper>
	);
}

export default HeroList;
