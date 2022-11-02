import { useSpring, animated } from 'react-spring'

export type AnimationDirection = 'toRight' | 'toLeft'

function TransitionEvent({
  children,
  direction,
}: {
  children: React.ReactNode
  direction: AnimationDirection
}) {
  const springProps = useSpring({
    opacity: 1,
    delay: 100,
    transform: 'translateX(0px)',
    from: {
      opacity: 0,
      transform: direction === 'toRight' ? 'translateX(-250px)' : 'translateX(500px)',
    },
  })

  return <animated.div style={{ ...springProps }}>{children}</animated.div>
}

export default TransitionEvent
