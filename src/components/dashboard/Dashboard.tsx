import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useHeroesService from '../../hooks/useHeroes';
import { Hero } from '../../types/Hero';
import HeroesSearch from './HeroesSearch';
import './dashboard.css';

function Dashboard() {
	const { getHeroes } = useHeroesService();
	const [topHeroes, setTopHeroes] = useState<Hero[]>([]);

	useEffect(() => {
		const fetchTopHeroes = async () => {
			const heroes = await getHeroes();
			setTopHeroes(heroes.slice(1, 5));
		};
		fetchTopHeroes();
	}, []);

	return (
		<>
			<h2>Top Heroes</h2>
			<div className="heroes-menu">
				{topHeroes.map((hero) => (
					<Link key={crypto.randomUUID()} to={`/detail/${hero.id}`}>
						{hero.name}
					</Link>
				))}
			</div>
			<HeroesSearch />
		</>
	);
}
export default Dashboard;
