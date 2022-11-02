import { useSpring, animated } from 'react-spring'
import type { ChannelMessage } from './glossary'

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
  const circleSpringProps = useSpring({
    opacity: 1,
    delay: 300,
    transform: 'translateY(0px)',
    from: {
      opacity: 0,
      transform: 'translateY(-50px)',
    },
  })
  return (
    <animated.div style={{ ...messageSpringProps }} className="chat--message">
      <span className={`chat--message-user-type chat--message-user-type__${data.userType}`}>
        {data.username}
      </span>

      <div className="chat--message-container">
        <animated.span
          style={{ ...circleSpringProps }}
          className={`chat--message-user-type-acc chat--message-user-type-acc__${data.userType}`}
        >
          <span className="big-circle"></span>
          <span className="circle"></span>
          <span className="line"></span>
        </animated.span>
        <span className="chat--message-text">
          <span dangerouslySetInnerHTML={{ __html: data.message }}></span>
        </span>
      </div>
    </animated.div>
  )
}

export default Message
