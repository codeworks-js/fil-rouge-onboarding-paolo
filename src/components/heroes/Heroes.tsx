import { useContext, useEffect, useState } from "react";
import "./heroes.css";
import HeroDetail from "./HeroDetail";
import { Hero } from "../../types/Hero";
import { HeroService } from "../../services/HeroService";
import { MessagesContext } from "../../contexts/MessagesContext";

interface HeroesProps {
    heroService: HeroService;
}

function Heroes({ heroService }: HeroesProps) {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

    const { add: addMessage } = useContext(MessagesContext);

    useEffect(() => {
        const fetchHeroes = async () => {
            const heroList = await heroService.getHeroes();
            setHeroes(heroList);
        }
        fetchHeroes();
    }, []);

    const selectHero = (hero: Hero) => {
        addMessage(`HeroesComponent: Selected hero id=${hero.id}`);
        setSelectedHero(hero);
    }

    return (
        <>
            <h2>My Heroes</h2>
            <ul className="heroes">
                {
                    heroes.map((hero) => {
                        const classname = selectedHero?.id === hero.id
                            ? "selected"
                            : "";

                        return (
                            <li key={hero.id}>
                                <button 
                                    type="button" 
                                    className={classname}
                                    onClick={(_) => selectHero(hero)}
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