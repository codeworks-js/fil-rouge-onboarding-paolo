import useHeroes from "../../hooks/useHeroes";
import { Link } from "react-router-dom";
import "./heroes.css";
import { useState } from "react";


function Heroes() {
    const { heroes, addHero, removeHero } = useHeroes();
    const [newHeroName, setNewHeroName] = useState<string>("");

    const updateNewHeroName: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const newName = event.target.value;
        if (newName.length === 0) {
            return;
        }
        setNewHeroName(newName);
    }

    return (
        <>
            <h2>My Heroes</h2>
            <div>
                <label htmlFor="new-hero">Hero name: </label>
                <input id="new-hero" onChange={updateNewHeroName}/>
                <button
                    type="button"
                    className="add-button"
                    onClick={(_) => addHero(newHeroName)}
                    >
                    Add hero
                </button>
            </div>
            <ul className="heroes">
                {
                    heroes.map((hero) => {
                        return (
                            <li key={hero.id}>
                                <Link to={`/detail/${hero.id}`}>
                                    <span className="badge">{hero.id}</span> 
                                    <span className="name">{hero.name}</span>
                                </Link>
                                <button 
                                    type="button" 
                                    className="delete" 
                                    title="delete hero"
                                    onClick={(_) => removeHero(hero.id)}
                                    >
                                    x
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default Heroes;