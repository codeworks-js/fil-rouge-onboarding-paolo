import { useContext, useState } from "react";
import { Hero } from "../types/Hero";
import { MessagesContext } from "../contexts/MessagesContext";
import { fetcher } from "../api/fetcher";

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

        return fetcher.get<Hero[]>({ url: new URL("api/heroes", import.meta.env.VITE_API_URL) })
            .catch((_) => {
                addMessage("Could not retrieve heroes.");
                return [];
            })
            .finally(() =>  setIsLoading(false));
    }

    const getHero = async (id: number): Promise<Hero> => {
        setIsLoading(true);
        addMessage(`HeroService: fetched hero id=${id}`);

        return fetcher.get<Hero>({ url: new URL(`api/heroes/${id}`, import.meta.env.VITE_API_URL) })
            .catch((_) => {
                addMessage("Could not get hero details.");
                return {
                    id: 0,
                    name: ''
                };
            })
            .finally(() =>  setIsLoading(false));
    } 

    const updateHero = async (hero: Hero): Promise<void> => {
        setIsLoading(true);

        await fetcher.put(
            { 
                url: new URL(`api/heroes`, import.meta.env.VITE_API_URL),
                body: hero
            })
            .catch((_) => addMessage("Could not modify hero details."))
            .finally(() =>  setIsLoading(false));
    }

    const addHero = async (name: string): Promise<Hero> => {
        setIsLoading(true);

        return fetcher.post<Hero>(
            { 
                url: new URL("api/heroes", import.meta.env.VITE_API_URL),
                body: { name }
            })
            .then((hero) => {
                addMessage(`Hero '${name}' created.`);
                return hero;
            })
            .catch((_) => {
                addMessage("Could not create hero.");
                return {
                    id: 0,
                    name: ''
                };
            })
            .finally(() =>  setIsLoading(false));
    }

    const removeHero = async (id: number): Promise<void> => {
        setIsLoading(true);

        await fetcher.delete({ url: new URL(`api/heroes/${id}`, import.meta.env.VITE_API_URL) })
            .then(() => addMessage(`Hero w/ id '${id}' removed.`))
            .catch((_) => addMessage("Could not remove hero."))
            .finally(() =>  setIsLoading(false));
    }

    const searchHeroes = async (term: string): Promise<Hero[]> => {
        setIsLoading(true);

        const matchedHeroes = await fetcher.get<Hero[]>({ url: new URL(`api/heroes/search?term=${term}`, import.meta.env.VITE_API_URL) })
            .catch((_) => {
                addMessage("Could not search heroes.");
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

export default useHeroesService;