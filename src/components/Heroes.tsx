import { useState } from "react";

export interface Hero {
    id: number;
    name: string;
}

function Heroes() {
    const [hero, setHero] = useState<Hero>({
        id: 1,
        name: 'Windstorm'
    });

    const updateHeroName: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setHero((previousHero) => ({
            id: previousHero.id,
            name: event.target.value
        }));
    }

    return (
        <>
            <h2>{hero.name.toUpperCase()} Details</h2>
            <div><span>id: </span>{hero.id}</div>
            <div>
                <label htmlFor="name">Hero name: </label>
                <input 
                    id="name" 
                    type="text"
                    value={hero.name} 
                    placeholder="name"
                    onChange={updateHeroName}
                    />
            </div>
        </>
    )
}

export default Heroes;