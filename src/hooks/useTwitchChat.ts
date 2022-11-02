import * as React from 'react'
import { ChatClient } from '@twurple/chat'

export function useTwitchChat(channel: string) {
  const [isConnected, setIsConnected] = React.useState(false)
  const chatClient = React.useMemo(() => {
    return new ChatClient({ channels: [channel] })
  }, [])

  React.useEffect(() => {
    setIsConnected(false)
    chatClient.connect().then(() => {
      setIsConnected(true)
    })
  }, [chatClient])

  return isConnected ? chatClient : null
}
