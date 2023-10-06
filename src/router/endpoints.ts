export const ENDPOINTS = {
    INDEX: "/",
    DASHBOARD: "/dashboard",
    HERO_DETAILS: "/detail/:id",
    HEROES: "/heroes"
};

export function getHeroDetailsEndpoint(heroId: number): string {
    return `/detail/${heroId}`;
}