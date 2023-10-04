import { useContext, useEffect, useState } from "react";
import { Hero } from "../types/Hero";
import { HEROES } from "../mocks/heroes-data";
import { MessagesContext } from "../contexts/MessagesContext";

function useHeroes() {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const { add: addMessage } = useContext(MessagesContext);

    const getHero = async (id: number): Promise<Hero> => {
        addMessage(`HeroService: fetched hero id=${id}`);
        return HEROES.find((hero) => hero.id === id)!;
    } 

    useEffect(() => {
        const fetchHeroes = async () => {
            const heroList = await getHeroes();
            setHeroes(heroList);
        }
        addMessage("HeroService: fetched heroes");
        fetchHeroes();
    }, []);

    return { heroes, getHero };
}

async function getHeroes(): Promise<Hero[]> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(HEROES), 2000);
    });
}

export default useHeroes;