import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/header/Header";
import HeroDetail from "./components/heroes/HeroDetail";
import Heroes from "./components/heroes/Heroes";
import Messages from "./components/messages/Messages";
import MessagesProvider from "./contexts/MessagesContext";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header/>
        <MessagesProvider>
          <Outlet/>
          <Messages/>
        </MessagesProvider>
      </>
    ),
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
        path: "*",
        element: <Dashboard/>
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router}/>
}

export default App
