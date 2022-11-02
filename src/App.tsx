import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Chat from './components/Chat'

function App() {
  const fakeEvents = new URL(location.href).searchParams.get('fakeEvents') !== null

  return (
    <Chat
      className="chat"
      channel={import.meta.env.TWITCH_CHANNEL}
      clientId={import.meta.env.TWITCH_CLIENT_ID}
      clientSecret={import.meta.env.TWITCH_CLIENT_SECRET}
      fakeEvents={fakeEvents}
    />
  )
}

export default App
