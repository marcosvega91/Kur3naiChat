import { useSpring, animated } from 'react-spring'
import type { ChannelMessage } from './glossary'
import follow_user_icon from '../assets/follow_user_icon.png'
import me_user_icon from '../assets/io_user_icon.png'
import mod_user_icon from '../assets/mod_user_icon.png'
import sub_user_icon from '../assets/sub_user_icon.png'

export type AnimationDirection = 'toRight' | 'toLeft'
interface Props {
  data: ChannelMessage
  direction: AnimationDirection
}

function Message({ data, direction }: Props) {
  const messageSpringProps = useSpring({
    opacity: 1,
    delay: 100,
    transform: 'translateX(0px)',
    from: {
      opacity: 0,
      transform: direction === 'toRight' ? 'translateX(-250px)' : 'translateX(500px)',
    },
  })

  const icon = (() => {
    switch (data.userType) {
      case 'mod': {
        return mod_user_icon
      }
      case 'vip':
      case 'sub': {
        return sub_user_icon
      }
      case 'me': {
        return me_user_icon
      }
      default: {
        return follow_user_icon
      }
    }
  })()
  return (
    <animated.div style={{ ...messageSpringProps }} className="chat--message">
      <div className={`chat--message-user-type chat--message-user-type__${data.userType}`}>
        <img src={icon} />
        <span>{data.username}</span>
      </div>

      <div className="chat--message-container">
        <span className="chat--message-text">
          <span dangerouslySetInnerHTML={{ __html: data.message }}></span>
        </span>
      </div>
    </animated.div>
  )
}

export default Message
