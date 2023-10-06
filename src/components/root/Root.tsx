import { Outlet } from "react-router-dom";
import MessagesProvider from "../../contexts/MessagesContext";
import Header from "../header/Header";
import Messages from "../messages/Messages";

function Root() {
    return (
        <>
            <Header/>
            <MessagesProvider>
                <Outlet/>
                <Messages/>
            </MessagesProvider>
        </>
    )
}

export default Root;