import { rest } from "msw";
import { HEROES } from "./heroes-data";
import { Hero } from "../types/Hero";

export const handlers = [
    rest.post("/api/heroes", async (req, res, ctx) => {
        const { name } = await req.json();

        const newHero: Hero = {
            id: generateId(),
            name
        };
        HEROES.set(newHero.id, newHero);

        return res(
            ctx.status(201),
            ctx.json(newHero)
        );
    }),

    rest.get("/api/heroes/search", async (req, res, ctx) => {
        const term = req.url.searchParams.get("term") || "";
        if (term === "") {
            return res(
                ctx.status(200),
                ctx.delay(3000),
                ctx.json([])
            );
        }

        const matches = Array.from(HEROES.values())
            .filter((hero) => hero.name.toLowerCase().includes(term));
        return res(
            ctx.status(200),
            ctx.delay(3000),
            ctx.json(matches)
        );
    }),

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
    }),

    rest.delete("/api/heroes/:id", (req, res, ctx) => {
        const heroId = Number(String(req.params.id));
        HEROES.delete(heroId);
        return res(ctx.status(204));
    })
]

function generateId(): number {
    return HEROES.size > 0
        ? Math.max(...HEROES.keys()) + 1
        : 11;
}