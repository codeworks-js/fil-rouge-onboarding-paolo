import Heroes from "./components/heroes/Heroes"
import { HeroService } from "./services/HeroService"

const heroService = new HeroService();

function App() {
  return (
    <>
      <h1>Tour of heroes</h1>
      <Heroes heroService={heroService}/>
    </>
  )
}

export default App
