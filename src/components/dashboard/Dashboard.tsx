import useHeroes from "../../hooks/useHeroes";
import { Link } from "react-router-dom";
import "./dashboard.css";

function Dashboard() {
    const {heroes} = useHeroes();

    return (
        <>
            <h2>Top Heroes</h2>
            <div className="heroes-menu">
                {
                    heroes.slice(1, 5).map((hero) => <Link key={crypto.randomUUID()} to={`/detail/${hero.id}`}>{hero.name}</Link>)
                }
            </div>
        </>
    );
}
export default Dashboard;