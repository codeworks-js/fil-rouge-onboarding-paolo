import useHeroes from "../../hooks/useHeroes";
import { Link } from "react-router-dom";
import "./heroes.css";


function Heroes() {
    const { heroes } = useHeroes();

    return (
        <>
            <h2>My Heroes</h2>
            <ul className="heroes">
                {
                    heroes.map((hero) => {
                        return (
                            <li key={hero.id}>
                                <Link to={`/detail/${hero.id}`}>
                                    <span className="badge">{hero.id}</span> 
                                    <span className="name">{hero.name}</span>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default Heroes;