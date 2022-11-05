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
import bit from '../assets/bit_icon.png'
import follow from '../assets/follow_icon.png'
import prime from '../assets/prime_icon.png'
import raid from '../assets/raid_icon.png'
import resub from '../assets/resub_icon.png'
import sub from '../assets/sub_icon.png'
import gift from '../assets/gift_icon.png'
import pattern_bit from '../assets/pattern_bit.png'
import pattern_follow from '../assets/pattern_follow.png'
import pattern_gift from '../assets/pattern_gift.png'
import pattern_prime from '../assets/pattern_prime.png'
import pattern_raid from '../assets/pattern_raid.png'
import pattern_resub_prime from '../assets/pattern_resub_prime.png'
import pattern_resub from '../assets/pattern_resub.png'
import pattern_sub from '../assets/pattern_sub.png'

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
  const { icon, pattern } = (() => {
    switch (data.type) {
      case 'sub': {
        return {
          icon: sub,
          pattern: pattern_sub,
        }
      }
      case 'prime': {
        return {
          icon: prime,
          pattern: pattern_prime,
        }
      }
      case 'follow': {
        return {
          icon: follow,
          pattern: pattern_follow,
        }
      }
      case 'subgift':
      case 'subgiftuser': {
        return {
          icon: gift,
          pattern: pattern_gift,
        }
      }
      case 'resubprime': {
        return {
          icon: resub,
          pattern: pattern_resub_prime,
        }
      }
      case 'resub': {
        return {
          icon: resub,
          pattern: pattern_resub,
        }
      }
      case 'raid': {
        return {
          icon: raid,
          pattern: pattern_raid,
        }
      }
      case 'bit': {
        return {
          icon: bit,
          pattern: pattern_bit,
        }
      }
      default: {
        return {
          icon: null,
          pattern: null,
        }
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
      <div className={`event chat--${data.type}`} style={{ backgroundImage: `url("${pattern}")` }}>
        <img src={icon} className="chat-icon" />
        {text}
      </div>
    </animated.div>
  )
}

export default Event
