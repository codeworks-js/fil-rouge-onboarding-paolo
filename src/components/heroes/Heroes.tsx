import { useState } from "react";
import "./heroes.css";
import HeroDetail from "./HeroDetail";
import { HEROES } from "../../mocks/heroes-data";
import { Hero } from "../../types/Hero";

function Heroes() {
    const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

    return (
        <>
            <h2>My Heroes</h2>
            <ul className="heroes">
                {
                    HEROES.map((hero) => {
                        const classname = selectedHero?.id === hero.id
                            ? "selected"
                            : "";

                        return (
                            <li key={hero.id}>
                                <button 
                                    type="button" 
                                    className={classname}
                                    onClick={(_) => setSelectedHero(hero)}
                                    >
                                    <span className="badge">{hero.id}</span>
                                    <span className="name">{hero.name}</span>
                                </button>
                            </li>
                        )
                    })
                }
            </ul>

            <HeroDetail hero={selectedHero} updateHero={setSelectedHero}/>
        </>
    )
}

export default Heroes;