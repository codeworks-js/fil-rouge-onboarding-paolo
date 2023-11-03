import HeroList from './HeroList/HeroList';
import NewHeroForm from './NewHeroForm/NewHeroForm';

function Heroes() {
	return (
		<>
			<h2>My Heroes</h2>
			<NewHeroForm />
			<HeroList />
		</>
	);
}

export default Heroes;
