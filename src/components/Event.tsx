import { useSpring, animated } from 'react-spring'
import type {
  ChannelBit,
  ChannelFollow,
  ChannelPrime,
  ChannelRaid,
  ChannelReSub,
  ChannelReSubPrime,
  ChannelSub,
  ChannelSubGift,
  ChannelSubGiftToUser,
} from './glossary'
interface Props {
  data:
    | ChannelSub
    | ChannelFollow
    | ChannelRaid
    | ChannelReSub
    | ChannelSubGiftToUser
    | ChannelSubGift
    | ChannelBit
    | ChannelPrime
    | ChannelReSubPrime
}

function Event({ data }: Props) {
  const icon = (() => {
    switch (data.type) {
      case 'sub': {
        return '/images/sub_icon.png'
      }
      case 'prime': {
        return '/images/prime_icon.png'
      }
      case 'follow': {
        return '/images/follow_icon.png'
      }
      case 'subgiftuser': {
        return '/images/gift_icon.png'
      }
      case 'subgift': {
        return '/images/gift_icon.png'
      }
      case 'resubprime':
      case 'resub': {
        return '/images/resub_icon.png'
      }
      case 'raid': {
        return '/images/raid_icon.png'
      }
      case 'bit': {
        return '/images/bit_icon.png'
      }
      default: {
        break
      }
    }
  })()

  const text = (() => {
    switch (data.type) {
      case 'sub': {
        return (
          <>
            <span className="chat-user">{data.username}</span>
            <span className="chat-event">just subscribed</span>
          </>
        )
      }
      case 'prime': {
        return (
          <>
            <span className="chat-user">{data.username}</span>
            <span className="chat-event">just subscribed with prime</span>
          </>
        )
      }
      case 'follow': {
        return (
          <>
            <span className="chat-event">New Follower</span>
            <span className="chat-user">{data.username}</span>
          </>
        )
      }
      case 'subgiftuser': {
        return (
          <>
            <span className="chat-user">{data.username}</span>
            <span className="chat-event">gifted a sub to</span>
            <span className="chat-user">{data.recipient}</span>
          </>
        )
      }
      case 'subgift': {
        return (
          <>
            <span className="chat-user">{data.username}</span>
            <span className="chat-event">gifter {data.count} subs to the community</span>
          </>
        )
      }
      case 'resub': {
        return (
          <>
            <span className="chat-user">{data.username}</span>
            <span className="chat-event">resubscribed for {data.numMonths} months</span>
          </>
        )
      }
      case 'resubprime': {
        return (
          <>
            <span className="chat-user">{data.username}</span>
            <span className="chat-event">
              resubscribed for {data.numMonths} months <br /> with prime
            </span>
          </>
        )
      }
      case 'raid': {
        return (
          <>
            <span className="chat-event">{data.count} raiders from</span>
            <span className="chat-user">{data.username}</span>
            <span className="chat-event">arrive bringing bubble tea and food</span>
          </>
        )
      }
      case 'bit': {
        return (
          <>
            <span className="chat-event">{data.count} new cheers from</span>
            <span className="chat-user">{data.username}</span>
            <span className="chat-event">{data.message}</span>
          </>
        )
      }
      default: {
        break
      }
    }
  })()

  const messageSpringProps = useSpring({
    opacity: 1,
    delay: 100,
    width: '100%',
    from: {
      opacity: 0,
      width: '50%',
    },
    bounce: 0.5,
  })

  if (!icon) return null

  return (
    <animated.div style={{ ...messageSpringProps, margin: '0 auto' }}>
      <div className={`event chat--${data.type}`}>
        <img src={icon} className="chat-icon" />
        {text}
      </div>
    </animated.div>
  )
}

export default Event
