import './App.css'
import Chat from './components/Chat'
import Heart from './components/Heart'

function App() {
  const fakeEvents = new URL(location.href).searchParams.get('fakeEvents') !== null

  return (
    <Chat
      className="chat"
      channel={import.meta.env.VITE_TWITCH_CHANNEL}
      clientId={import.meta.env.VITE_TWITCH_CLIENT_ID}
      clientSecret={import.meta.env.VITE_TWITCH_CLIENT_SECRET}
      fakeEvents={fakeEvents}
      heart={(event?: string) => {
        return <Heart event={event} />
      }}
    />
  )
}

export default App
