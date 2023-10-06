import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import HeroDetail from "../components/heroes/HeroDetail";
import Heroes from "../components/heroes/Heroes";
import Root from "../components/root/Root";
import { ENDPOINTS } from "./endpoints";

const router = createBrowserRouter([
    {
        path: ENDPOINTS.INDEX,
        element: <Root/>,
        children: [
            {
                path: ENDPOINTS.DASHBOARD,
                element: <Dashboard/>
            },
            {
                path: ENDPOINTS.HERO_DETAILS,
                element: <HeroDetail/>
            },
            {
                path: ENDPOINTS.HEROES,
                element: <Heroes/>
            },
            {
                index: true,
                element: <Dashboard/>
            }
        ]
    }
])

function AppRouter() {
    return <RouterProvider router={router}/>
}

export default AppRouter;