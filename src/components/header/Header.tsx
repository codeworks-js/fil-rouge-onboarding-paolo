import { Link } from 'react-router-dom';
import { ENDPOINTS } from '../../router/endpoints';

function Header() {
	return (
		<>
			<h1>Tour of heroes</h1>
			<nav>
				<Link to={ENDPOINTS.DASHBOARD}>Dashboard</Link>
				<Link to={ENDPOINTS.HEROES}>Heroes</Link>
			</nav>
		</>
	);
}

export default Header;
