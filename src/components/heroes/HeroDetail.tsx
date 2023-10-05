import { Hero } from "../../types/Hero";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useHeroesService from "../../hooks/useHeroes";
import "./heroes-detail.css";

function HeroDetail() {
    const { id } = useParams();
    const { getHero, updateHero } = useHeroesService();
    const [currentHero, setCurrentHero] = useState<Hero | null>(null);
    const navigate = useNavigate();
    
    const goBack = () => navigate(-1);

    const updateHeroName: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (!currentHero) {
            return;
        }

        setCurrentHero({
            id: currentHero.id,
            name: event.target.value
        });
    }

    const saveHero = async () => {
        if (currentHero === null) {
            return;
        }

        await updateHero(currentHero);
        goBack();
    }

    useEffect(() => {
        const heroId = Number(String(id)) || 12;
        const fetchHero = async (id: number) => {
            const hero = await getHero(id);
            setCurrentHero(hero);
        }
        fetchHero(heroId);

    }, []);

    if (!currentHero) {
        return <></>
    }

    return (
        <>
            <h2>{currentHero.name.toUpperCase()} Details</h2>
            <div><span>id: </span>{currentHero.id}</div>
            <div>
                <label htmlFor="name">Hero name: </label>
                <input 
                    id="name" 
                    type="text"
                    value={currentHero.name} 
                    placeholder="name"
                    onChange={updateHeroName}
                    />
            </div>
            <button type="button" onClick={(_) => goBack()}>go back</button>
            <button type="button" onClick={(_) => saveHero()}>Save</button>
        </>
    )
}

export default HeroDetail;