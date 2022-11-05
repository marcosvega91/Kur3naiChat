import * as React from 'react'
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
  const [fakeEvents, setFakeEvents] = React.useState(
    new URL(location.href).searchParams.get('fakeEvents') !== null,
  )
  const [channel, setChannel] = React.useState(import.meta.env.VITE_TWITCH_CHANNEL)

  React.useEffect(() => {
    window.addEventListener('onWidgetLoad', async function (obj) {
      setFakeEvents(obj.detail.fieldData.fakeEvents)
      setChannel(obj.detail.channel.username)
    })
  }, [])

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
