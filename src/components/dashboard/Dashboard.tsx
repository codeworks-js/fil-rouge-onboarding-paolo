import HeroesSearch from './HeroesSearch/HeroesSearch';
import TopHeroes from './TopHeroes/TopHeroes';
import './dashboard.css';

function Dashboard() {
	return (
		<>
			<h2>Top Heroes</h2>
			<TopHeroes />
			<HeroesSearch />
		</>
	);
}

export default Dashboard;
