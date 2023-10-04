import Heroes from "./components/heroes/Heroes"
import Messages from "./components/messages/Messages";
import MessagesProvider from "./contexts/MessagesContext";

function App() {
  return (
    <>
      <h1>Tour of heroes</h1>
      <MessagesProvider>
        <Heroes />
        <Messages/>
      </MessagesProvider>
    </>
  )
}

export default App
