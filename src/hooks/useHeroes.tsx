import { useContext, useEffect, useState } from "react";
import { Hero } from "../types/Hero";
import { MessagesContext } from "../contexts/MessagesContext";

function useHeroes() {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const { add: addMessage } = useContext(MessagesContext);

    const getHero = async (id: number): Promise<Hero> => {
        addMessage(`HeroService: fetched hero id=${id}`);
        return await getHeroById(id).catch((err) => {
            addMessage(err.message);
            return {
                id: 0,
                name: ''
            };
        });
    } 

    useEffect(() => {
        const fetchHeroes = async () => {
            const heroList = await getHeroes();
            setHeroes(heroList);
        }
        addMessage("HeroService: fetched heroes");
        fetchHeroes()
            .catch((err) => addMessage(err.message));
    }, []);

    return { heroes, getHero };
}

async function getHeroes(): Promise<Hero[]> {
    const data = await fetch("/api/heroes");
    if (data.status !== 200) {
        throw new Error("Could not retrieve heroes.");
    }
    return data.json();
}

async function getHeroById(id: number): Promise<Hero> {
    const data = await fetch(`/api/heroes/${id}`);
    if (data.status !== 200) {
        throw new Error("Could not get hero details.");
    }
    return data.json();
}

export default useHeroes;