import { useState } from "react";
import "./heroes.css";
import HeroDetail from "./HeroDetail";

export interface Hero {
    id: number;
    name: string;
}

export const HEROES: Hero[] = [
  { id: 12, name: 'Dr. Nice' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr. IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

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