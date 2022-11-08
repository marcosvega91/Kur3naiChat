import * as React from 'react'
import { ChatClient } from '@twurple/chat'

export function useTwitchChat(channel: string) {
  const [isConnected, setIsConnected] = React.useState(false)
  const chatClient = React.useMemo(() => {
    return new ChatClient({ channels: [channel] })
  }, [])

  React.useEffect(() => {
    setIsConnected(false)

    if (!chatClient.isConnected && !chatClient.isConnecting) {
      chatClient.connect().then(() => {
        setIsConnected(true)
      })
    } else if (chatClient.isConnected) {
      setIsConnected(true)
    } else {
      chatClient.onConnect(() => {
        setIsConnected(true)
      })
    }
  }, [chatClient])

  return isConnected ? chatClient : null
}
