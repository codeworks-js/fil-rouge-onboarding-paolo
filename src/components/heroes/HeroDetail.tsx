import { Hero } from "./Heroes"

interface HeroDetailProps {
    hero: Hero | null;
    updateHero: React.Dispatch<React.SetStateAction<Hero | null>>;
}

function HeroDetail({ hero, updateHero }: HeroDetailProps) {

    const updateHeroName: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (!hero) {
            return;
        }

        updateHero({
            id: hero.id,
            name: event.target.value
        });
    }

    if (!hero) {
        return <></>
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

export default HeroDetail;