import './App.css'
import Chat from './components/Chat'
import Heart from './components/Heart'
declare global {
  interface WindowEventMap {
    onWidgetLoad: CustomEvent<{
      channel: {
        username: string
        apiToken: string
      }
      fieldData: {
        fakeEvents: boolean
      }
    }>
  }
}

function App() {
  return (
    <Chat
      className="chat"
      channelId={import.meta.env.VITE_TWITCH_CHANNEL_ID}
      channel={import.meta.env.VITE_TWITCH_CHANNEL}
      clientId={import.meta.env.VITE_TWITCH_CLIENT_ID}
      clientSecret={import.meta.env.VITE_TWITCH_CLIENT_SECRET}
      fakeEvents={new URL(location.href).searchParams.get('fakeEvents') !== null}
      heart={(event?: string) => {
        return <Heart event={event} />
      }}
    />
  )
}

export default App
