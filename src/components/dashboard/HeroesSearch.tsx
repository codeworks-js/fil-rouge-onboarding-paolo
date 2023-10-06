import { Link } from "react-router-dom";
import { Hero } from "../../types/Hero";
import { ChangeEventHandler, useState } from "react";
import useHeroesService from "../../hooks/useHeroes";
import { getHeroDetailsEndpoint } from "../../router/endpoints";
import "./heroes-search.css";
import SearchResultSkeleton from "./SearchResultSkeleton";

function HeroesSearch() {
    const [matchedHeroes, setMatchedHeroes] = useState<Hero[]>([]);
    const { isLoading, searchHeroes } = useHeroesService();
    const [term, setTerm] = useState<string>("");

    const onSearchInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const newTerm = event.target.value;
        setTerm(newTerm);
    }

    const onSearchSubmit = async(): Promise<void> => {
        if (term === "") {
            return;
        }

        const heroes = await searchHeroes(term);
        setMatchedHeroes(heroes);
    }

    return (
        <div id="search-component">
            <label htmlFor="search-box">Hero search</label>
            <input id="search-box" onChange={onSearchInputChange}/>
            <button disabled={isLoading()} onClick={onSearchSubmit}>Submit</button>
            <ul className="search-result">
                {
                    isLoading() 
                        ? <SearchResultSkeleton />
                        : matchedHeroes.map((hero) => {
                            return (
                                <li key={crypto.randomUUID()}>
                                    <Link to={getHeroDetailsEndpoint(hero.id)}>{hero.name}</Link>
                                </li>
                            )
                        })
                }
            </ul>
        </div>
    )
}

export default HeroesSearch;