import { Link } from "react-router-dom";

function Header() {
    return (
        <>
            <h1>Tour of heroes</h1>
            <nav>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/heroes">Heroes</Link>
            </nav>
        </>
    )
}

export default Header;
