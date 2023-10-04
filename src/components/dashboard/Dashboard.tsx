import useHeroes from "../../hooks/useHeroes";
import "./dashboard.css";

function Dashboard() {
    const {heroes} = useHeroes();

    return (
        <>
            <h2>Top Heroes</h2>
            <div className="heroes-menu">
                {
                    heroes.slice(1, 5).map((hero) => <a key={crypto.randomUUID()}>{hero.name}</a>)
                }
            </div>
        </>
    );
}
export default Dashboard;