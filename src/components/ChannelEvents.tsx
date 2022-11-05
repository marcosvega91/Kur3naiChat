import React from 'react'
import type { ParsedMessagePart } from '@twurple/common'
import { useFakeEvents } from '../hooks/useFakeEvents'
import { useTwitchChat } from '../hooks/useTwitchChat'
import { useTwitchFollow } from '../hooks/useTwitchFollow'
import { ChannelEvent, UserType } from './glossary'
import Message from './Message'
import Event from './Event'

interface Props {
  channel: string
  clientId: string
  clientSecret: string
  fakeEvents: boolean
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

function ChannelEvents({ fakeEvents, channel, clientId, clientSecret }: Props) {
  const twitchChat = useTwitchChat(channel)
  const twitchFollow = useTwitchFollow(channel, clientId, clientSecret)
  const [channelEvents, setChannelEvents] = React.useState<ChannelEvent[]>([])
  const appendEvent = React.useCallback((event: ChannelEvent) => {
    setChannelEvents((channelEvents) => {
      const events = [event, ...channelEvents]
      return events.slice(0, Math.min(20, events.length))
    })
  }, [])

  const { start, stop } = useFakeEvents(appendEvent)

  React.useEffect(() => {
    if (fakeEvents) {
      start()
      return () => stop()
    }
  }, [])

  React.useEffect(() => {
    twitchChat?.onMessage((_, user, __, msg) => {
      if (msg.bits > 0) {
        appendEvent({
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
        appendEvent({ type: 'prime', username: username })
      } else appendEvent({ type: 'sub', username: username })
    })

    twitchChat?.onResub((_, username, subInfo) => {
      if (subInfo.isPrime) {
        appendEvent({
          type: 'resubprime',
          username: username,
          numMonths: subInfo.months,
        })
      } else
        appendEvent({
          type: 'resub',
          username: username,
          numMonths: subInfo.months,
        })
    })

    twitchChat?.onRaid((_, username, raidInfo) => {
      appendEvent({ type: 'raid', username: username, count: raidInfo.viewerCount })
    })

    twitchChat?.onSubGift((_, username, subInfo) => {
      if (subInfo.gifter)
        appendEvent({ type: 'subgiftuser', username: username, recipient: subInfo.gifter })
    })

    twitchChat?.onCommunitySub((_, username, subInfo) => {
      if (subInfo.gifter) appendEvent({ type: 'subgift', username: username, count: subInfo.count })
    })
  }, [twitchChat, appendEvent])

  React.useEffect(() => {
    twitchFollow?.onFollow((username) => {
      appendEvent({ type: 'follow', username: username })
    })
  }, [twitchFollow, appendEvent])
  return (
    <div className="chat-wrapper">
      {channelEvents.map((channelEvent, index) => {
        const direction = (channelEvents.length - (index + 1)) % 2 === 0 ? 'toRight' : 'toLeft'
        if (channelEvent.type === 'message')
          return (
            <Message key={`msg-${channelEvent.id}`} direction={direction} data={channelEvent} />
          )
        else
          return <Event key={`${channelEvent.type}-${channelEvent.username}`} data={channelEvent} />
      })}
    </div>
  )
}

export default ChannelEvents
