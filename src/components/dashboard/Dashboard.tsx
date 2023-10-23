import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useListHeroes } from '../../hooks/heroes/useListHeroes';
import { Hero } from '../../types/Hero';
import ErrorWrapper from '../error-wrapper/ErrorWrapper';
import HeroesSearch from './HeroesSearch';
import './dashboard.css';

const Dashboard = observer(() => {
	const { heroes, isLoading, error } = useListHeroes();

	return (
		<>
			<h2>Top Heroes</h2>
			<ErrorWrapper error={error()}>
				<div className="heroes-menu">
					{isLoading() ? (
						<div>Loading... </div>
					) : (
						<TopHeroItems topHeroes={heroes().slice(1, 5)} />
					)}
				</div>
			</ErrorWrapper>
			<HeroesSearch />
		</>
	);
});

function TopHeroItems(props: { topHeroes: Hero[] }) {
	return (
		<>
			{props.topHeroes.map((hero) => (
				<Link key={crypto.randomUUID()} to={`/detail/${hero.id}`}>
					{hero.name}
				</Link>
			))}
		</>
	);
}

export default Dashboard;
