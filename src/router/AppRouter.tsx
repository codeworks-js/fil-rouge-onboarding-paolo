import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import HeroDetail from "../components/heroes/HeroDetail";
import Heroes from "../components/heroes/Heroes";
import Root from "../components/root/Root";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard/>
            },
            {
                path: "/detail/:id",
                element: <HeroDetail/>
            },
            {
                path: "/heroes",
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