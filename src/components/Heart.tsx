import * as React from 'react'
import { animated, useSpring } from 'react-spring'

interface Props {
  event?: string
}

function Heart({ event }: Props) {
  const [active, setActive] = React.useState(true)
  const styles = useSpring({
    loop: true,
    to: [
      { opacity: '0.7' },
      { transform: 'scale(1.2)' },
      { transform: 'scale(1)' },
      { transform: 'scale(1.2)' },
      { transform: 'scale(1)' },
      { transform: 'scale(1.2)' },
    ],
    config: { duration: 300 },
  })

  React.useEffect(() => {
    if (event) {
      setActive(true)
      const timeoutId = setTimeout(() => {
        setActive(false)
      }, 5000)

      return () => {
        clearTimeout(timeoutId)
        setActive(false)
      }
    }
  }, [event])
  if (!event || !active) return null
  return <animated.img style={{ ...styles }} className="heart" src={`/images/${event}.png`} />
}

export default Heart
