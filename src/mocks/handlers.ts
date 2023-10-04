import { rest } from "msw";
import { HEROES } from "./heroes-data";
import { Hero } from "../types/Hero";

export const handlers = [
    rest.get("/api/heroes/:id", (req, res, ctx) => {
        const heroId = Number(String(req.params.id));
        const hero = HEROES.get(heroId);
        
        if (hero === undefined) {
            return res(ctx.status(404));
        }
        return res(ctx.json(hero));
     }),

    rest.get("/api/heroes", (_, res, ctx) => {
        return res(ctx.json(Array.from(HEROES.values())));
    }),

    rest.put("/api/heroes", async (req, res, ctx) => {
        const hero = await req.json<Hero>();
        HEROES.set(hero.id, hero);
        return res(ctx.status(200));
    })
]