import Heroes from "./components/heroes/Heroes"
import Messages from "./components/messages/Messages";
import MessagesProvider from "./contexts/MessagesContext";
import { HeroService } from "./services/HeroService";

const heroService = new HeroService();

function App() {
  return (
    <>
      <h1>Tour of heroes</h1>
      <MessagesProvider>
        <Heroes heroService={heroService}/>
        <Messages/>
      </MessagesProvider>
    </>
  )
}

export default App
