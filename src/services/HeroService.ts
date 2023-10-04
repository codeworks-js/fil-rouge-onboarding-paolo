import { HEROES } from "../mocks/heroes-data";
import { Hero } from "../types/Hero";

export class HeroService {
    getHeroes(): Hero[] {
        return HEROES;
    }
}