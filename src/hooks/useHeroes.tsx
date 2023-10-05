import { useContext, useState } from "react";
import { Hero } from "../types/Hero";
import { MessagesContext } from "../contexts/MessagesContext";

interface IHeroesService {
    isLoading: () => boolean;
    addHero(name: string): Promise<Hero>;
    getHero(id: number): Promise<Hero>;
    getHeroes(): Promise<Hero[]>;
    removeHero(id: number): Promise<void>;
    searchHeroes(term: string): Promise<Hero[]>;
    updateHero(hero: Hero): Promise<void>;
}

function useHeroesService(): IHeroesService {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { add: addMessage } = useContext(MessagesContext);

    const getHeroes = async (): Promise<Hero[]> => {
        setIsLoading(true);
        addMessage("HeroService: fetched heroes");

        return listHeroes()
            .catch((err) => {
                addMessage(err.message);
                return [];
            })
            .finally(() =>  setIsLoading(false));
    }

    const getHero = async (id: number): Promise<Hero> => {
        setIsLoading(true);
        addMessage(`HeroService: fetched hero id=${id}`);

        return getHeroById(id)
            .catch((err) => {
                addMessage(err.message);
                return {
                    id: 0,
                    name: ''
                };
            })
            .finally(() =>  setIsLoading(false));;
    } 

    const updateHero = async (hero: Hero): Promise<void> => {
        setIsLoading(true);

        await modifyHero(hero)
            .catch((err) => addMessage(err.message))
            .finally(() =>  setIsLoading(false));
    }

    const addHero = async (name: string): Promise<Hero> => {
        setIsLoading(true);

        return createHero(name)
            .then((hero) => {
                addMessage(`Hero '${name}' created.`);
                return hero;
            })
            .catch((err) => {
                addMessage(err.message);
                return {
                    id: 0,
                    name: ''
                };
            })
            .finally(() =>  setIsLoading(false));
    }

    const removeHero = async (id: number): Promise<void> => {
        setIsLoading(true);

        await deleteHero(id)
            .then(() => addMessage(`Hero w/ id '${id}' removed.`))
            .catch((err) => addMessage(err.message))
            .finally(() =>  setIsLoading(false));
    }

    const searchHeroes = async (term: string): Promise<Hero[]> => {
        setIsLoading(true);

        const matchedHeroes = await findHeroesByTerm(term)
            .catch((err) => {
                addMessage(err.message);
                return [];
            })
            .finally(() =>  setIsLoading(false));

        addMessage(`Found ${matchedHeroes.length} result(s).`);
        return matchedHeroes;
    }

    return { 
        isLoading: () => isLoading, 
        addHero, 
        getHero, 
        getHeroes, 
        removeHero, 
        searchHeroes, 
        updateHero, 
    };
}

async function listHeroes(): Promise<Hero[]> {
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

async function modifyHero(hero: Hero): Promise<void> {
    const data = await fetch(
        "/api/heroes", 
        { 
            method: "PUT",
            body: JSON.stringify(hero)
        }
    );
    if (data.status !== 200) {
        throw new Error("Could not get hero details.");
    }
}

async function createHero(name: string): Promise<Hero> {
    const data = await fetch(
        "/api/heroes",
        {
            method: "POST",
            body: JSON.stringify({ name })
        }
    );
    if (data.status !== 201) {
        throw new Error("Could not create hero.");
    }
    return await data.json();
}

async function deleteHero(id: number): Promise<void> {
    const data = await fetch(
        `/api/heroes/${id}`,
        { method: "DELETE" }
    );
    if (data.status !== 204) {
        throw new Error("Could not remove hero.");
    }
}

async function findHeroesByTerm(term: string): Promise<Hero[]> {
    if (term.trim().length === 0) {
        return [];
    }

    const data = await fetch(`/api/heroes/search?term=${term.trim()}`);
    if (data.status !== 200) {
        throw new Error("Could not search heroes.");
    }
    return await data.json();
}

export default useHeroesService;