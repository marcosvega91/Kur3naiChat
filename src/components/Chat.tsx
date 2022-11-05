import * as React from 'react'
import type { ParsedMessagePart } from '@twurple/common'
import { useTwitchChat } from '../hooks/useTwitchChat'
import { useTwitchFollow } from '../hooks/useTwitchFollow'
import { useFakeEvents } from '../hooks/useFakeEvents'
import Event from './Event'
import type { ChannelEvent, UserType } from './glossary'
import Message from './Message'
import { useDebounceAppend } from '../hooks/useDebounceAppend'
import baloon from '../assets/baloon.png'

interface Props {
  channel: string
  clientId: string
  clientSecret: string
  fakeEvents: boolean
  heart: (event?: string) => React.ReactNode
  className?: string
}

function toHtml(parts: ParsedMessagePart[]) {
  return parts.reduce((acc, part) => {
    if (part.type === 'text') {
      return acc + part.text
    }
    if (part.type === 'emote') {
      return (
        acc +
        `<img src="${part.displayInfo.getUrl({
          size: '1.0',
          backgroundType: 'light',
          animationSettings: 'default',
        })}" />`
      )
    }
    return acc
  }, '')
}

function Chat({ channel, clientId, clientSecret, fakeEvents, heart, className }: Props) {
  const twitchChat = useTwitchChat(channel)
  const twitchFollow = useTwitchFollow(channel, clientId, clientSecret)
  const [channelEvents, setChannelEvents] = React.useState<ChannelEvent[]>([])
  const [lastEventType, setLastEventType] = React.useState<string>()

  const appendEvent = React.useCallback((event: ChannelEvent) => {
    setChannelEvents((channelEvents) => {
      const events = [event, ...channelEvents]
      return events.slice(0, Math.min(20, events.length))
    })
    if (event.type !== 'message') setLastEventType(event.type)
  }, [])

  const debounceAppend = useDebounceAppend(appendEvent, 2000)

  const { start, stop } = useFakeEvents(debounceAppend)

  React.useEffect(() => {
    if (fakeEvents) {
      start()
      return () => stop()
    }
  }, [fakeEvents])

  React.useEffect(() => {
    twitchChat?.onMessage((_, user, __, msg) => {
      if (msg.bits > 0) {
        debounceAppend({
          type: 'bit',
          username: user,
          count: msg.bits,
          message: toHtml(msg.parseEmotes()),
        })
        return
      }
      let userType: UserType =
        msg.userInfo.userName.toLowerCase() === channel.toLowerCase() ? 'me' : 'none'
      if (userType === 'none') {
        userType = msg.userInfo.userType === 'mod' ? 'mod' : 'none'
      }
      if (userType === 'none') {
        userType = msg.userInfo.isVip ? 'vip' : 'none'
      }
      if (userType === 'none') {
        userType = msg.userInfo.isSubscriber ? 'sub' : 'none'
      }

      appendEvent({
        type: 'message',
        username: user,
        id: msg.id,
        userType,
        message: toHtml(msg.parseEmotes()),
      })
    })
    twitchChat?.onSub((_, username, subInfo) => {
      if (subInfo.isPrime) {
        debounceAppend({ type: 'prime', username: username })
      } else debounceAppend({ type: 'sub', username: username })
    })

    twitchChat?.onResub((_, username, subInfo) => {
      if (subInfo.isPrime) {
        debounceAppend({
          type: 'resubprime',
          username: username,
          numMonths: subInfo.months,
        })
      } else
        debounceAppend({
          type: 'resub',
          username: username,
          numMonths: subInfo.months,
        })
    })

    twitchChat?.onRaid((_, username, raidInfo) => {
      debounceAppend({ type: 'raid', username: username, count: raidInfo.viewerCount })
    })

    twitchChat?.onSubGift((_, username, subInfo) => {
      if (subInfo.gifter)
        debounceAppend({ type: 'subgiftuser', username: username, recipient: subInfo.gifter })
    })

    twitchChat?.onCommunitySub((_, username, subInfo) => {
      if (subInfo.gifter)
        debounceAppend({ type: 'subgift', username: username, count: subInfo.count })
    })
  }, [twitchChat, debounceAppend])

  React.useEffect(() => {
    twitchFollow?.onFollow((username) => {
      debounceAppend({ type: 'follow', username: username })
    })
  }, [twitchFollow, debounceAppend])

  return (
    <div className={className}>
      <div className="chat-baloon">
        <img src={baloon} />
        {heart(lastEventType)}
      </div>
      <div className="chat-wrapper">
        {channelEvents.map((channelEvent, index) => {
          const direction = (channelEvents.length - (index + 1)) % 2 === 0 ? 'toRight' : 'toLeft'
          if (channelEvent.type === 'message')
            return (
              <Message key={`msg-${channelEvent.id}`} direction={direction} data={channelEvent} />
            )
          else
            return (
              <Event key={`${channelEvent.type}-${channelEvent.username}`} data={channelEvent} />
            )
        })}
      </div>
      <div className="chat-end" />
    </div>
  )
}

export default Chat
