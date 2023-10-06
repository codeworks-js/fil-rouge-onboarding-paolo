import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import HeroDetail from "../components/heroes/HeroDetail";
import Heroes from "../components/heroes/Heroes";
import Root from "../components/root/Root";
import { ENDPOINTS } from "./endpoints";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root/>}>
            <Route index element={<Dashboard/>}/>
            <Route path={ENDPOINTS.DASHBOARD} element={<Dashboard/>} />
            <Route path={ENDPOINTS.HEROES} element={<Heroes/>} />
            <Route path={ENDPOINTS.HERO_DETAILS} element={<HeroDetail/>} />
        </Route>
    )
)

function AppRouter() {
    return <RouterProvider router={router}/>
}

export default AppRouter;