import { HEROES } from "../mocks/heroes-data";
import { Hero } from "../types/Hero";

export class HeroService {
    getHeroes(): Promise<Hero[]> {
        // mock delay of 2sec
        return new Promise((resolve) => {
            setTimeout(() => resolve(HEROES), 2000);
        })
    }
}