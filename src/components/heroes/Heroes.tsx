import { useState } from "react";
import "./heroes.css";

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

    const updateHeroName: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (!selectedHero) {
            return;
        }

        setSelectedHero({
            id: selectedHero.id,
            name: event.target.value
        });
    }

    return (
        <>
            <h2>My Heroes</h2>
            <ul className="heroes">
                {
                    HEROES.map((hero) => {
                        const classname = selectedHero?.id === hero.id
                            ? "selected"
                            : "";
                        if (classname) {
                            console.log(hero.name);
                        }

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

            {
                selectedHero && (
                    <>
                        <h2>{selectedHero.name.toUpperCase()} Details</h2>
                        <div><span>id: </span>{selectedHero.id}</div>
                        <div>
                            <label htmlFor="name">Hero name: </label>
                            <input 
                                id="name" 
                                type="text"
                                value={selectedHero.name} 
                                placeholder="name"
                                onChange={updateHeroName}
                                />
                        </div>
                    </>
                )
            }

        </>
    )
}

export default Heroes;