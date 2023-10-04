import { rest } from "msw";
import { HEROES } from "./heroes-data";

export const handlers = [
    rest.get("/api/heroes/:id", (req, res, ctx) => {
        const heroId = Number(String(req.params.id));
        const hero = HEROES.find((hero) => hero.id === heroId);
        
        if (hero === undefined) {
            return res(ctx.status(404));
        }
        return res(ctx.json(hero));
     }),

    rest.get("/api/heroes", (_, res, ctx) => {
        return res(ctx.json(HEROES));
    })
]