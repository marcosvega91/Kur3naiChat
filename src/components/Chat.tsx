import * as React from 'react'
import type { ParsedMessagePart } from '@twurple/common'
import { useTwitchChat } from '../hooks/useTwitchChat'
import { useTwitchFollow } from '../hooks/useTwitchFollow'
import { useFakeEvents } from '../hooks/useFakeEvents'
import Event from './Event'
import type { ChannelEvent, UserType } from './glossary'
import Message from './Message'
import { useDebounceAppend } from '../hooks/useDebounceAppend'
import { useMessageFormatter } from '../hooks/useMessageFormatter'
import baloon from '../assets/baloon.png'

interface Props {
  channel: string
  channelId: string
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

function Chat({ channel, channelId, clientId, clientSecret, fakeEvents, heart, className }: Props) {
  const id = React.useRef(0)
  const twitchChat = useTwitchChat(channel)
  const twitchFollow = useTwitchFollow(channel, clientId, clientSecret)
  const [channelEvents, setChannelEvents] = React.useState<ChannelEvent[]>([])
  const [lastEventType, setLastEventType] = React.useState<string>()
  const formatter = useMessageFormatter(channelId)

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
      if (
        user.toLowerCase() === 'streamelements' &&
        (msg.content.value.includes('following') ||
          msg.content.value.includes('raiders') ||
          msg.content.value.includes('subscribed') ||
          msg.content.value.includes('bits'))
      )
        return
      if (msg.bits > 0) {
        debounceAppend({
          id: id.current++,
          type: 'bit',
          username: user,
          count: msg.bits,
          message: toHtml(formatter(msg.parseEmotes())),
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
        message: toHtml(formatter(msg.parseEmotes())),
      })
    })
    twitchChat?.onSub((_, username, subInfo) => {
      if (subInfo.isPrime) {
        debounceAppend({ id: id.current++, type: 'prime', username: username })
      } else debounceAppend({ id: id.current++, type: 'sub', username: username })
    })

    twitchChat?.onResub((_, username, subInfo) => {
      if (subInfo.isPrime) {
        debounceAppend({
          id: id.current++,
          type: 'resubprime',
          username: username,
          numMonths: subInfo.months,
        })
      } else
        debounceAppend({
          id: id.current++,
          type: 'resub',
          username: username,
          numMonths: subInfo.months,
        })
    })

    twitchChat?.onRaid((_, username, raidInfo) => {
      debounceAppend({
        id: id.current++,
        type: 'raid',
        username: username,
        count: raidInfo.viewerCount,
      })
    })

    twitchChat?.onSubGift((_, username, subInfo) => {
      if (subInfo.gifter)
        debounceAppend({
          id: id.current++,
          type: 'subgiftuser',
          username: subInfo.gifter,
          recipient: username,
        })
    })

    twitchChat?.onCommunitySub((_, username, subInfo) => {
      if (subInfo.gifter)
        debounceAppend({
          id: id.current++,
          type: 'subgift',
          username: username,
          count: subInfo.count,
        })
    })
  }, [twitchChat, debounceAppend])

  React.useEffect(() => {
    twitchFollow?.onFollow((username) => {
      debounceAppend({ id: id.current++, type: 'follow', username: username })
    })
  }, [twitchFollow, debounceAppend])

  return (
    <div className={className}>
      <div className="chat-wrapper">
        {channelEvents.map((channelEvent, index) => {
          const direction = (channelEvents.length - (index + 1)) % 2 === 0 ? 'toRight' : 'toLeft'
          if (channelEvent.type === 'message')
            return (
              <Message key={`msg-${channelEvent.id}`} direction={direction} data={channelEvent} />
            )
          else return <Event key={`${channelEvent.type}-${channelEvent.id}`} data={channelEvent} />
        })}
      </div>
      <div className="chat-end" />
    </div>
  )
}

export default Chat
