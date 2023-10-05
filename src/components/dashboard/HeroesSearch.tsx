import { Link } from "react-router-dom";
import { Hero } from "../../types/Hero";
import React, { useEffect, useState } from "react";
import useHeroesService from "../../hooks/useHeroes";
import "./heroes-search.css";

function HeroesSearch() {
    const [matchedHeroes, setMatchedHeroes] = useState<Hero[]>([]);
    const { searchHeroes } = useHeroesService();
    const [term, setTerm] = useState<string>("");

    const onSearchInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const newTerm = event.target.value;
        setTerm(newTerm);
    }

    useEffect(() => {
        const matchHeroes = async (term: string) => {
            const heroes = await searchHeroes(term);
            setMatchedHeroes(heroes);
        }
        matchHeroes(term);
    }, [term]);

    return (
        <div id="search-component">
            <label htmlFor="search-box">Hero search</label>
            <input id="search-box" onChange={onSearchInputChange}/>
            <button disabled>Submit</button>
            <ul className="search-result">
                {
                    matchedHeroes.map((hero) => {
                        return (
                            <li key={crypto.randomUUID()}>
                                <Link to={`/detail/${hero.id}`}>{hero.name}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default HeroesSearch;