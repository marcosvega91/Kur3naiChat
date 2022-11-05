import * as React from 'react'
import { animated, useSpring } from 'react-spring'
import bit from '../assets/bit.png'
import follow from '../assets/follow.png'
import normal from '../assets/normal.png'
import prime from '../assets/prime.png'
import raid from '../assets/raid.png'
import resub from '../assets/resub.png'
import resubprime from '../assets/resubprime.png'
import sub from '../assets/sub.png'
import subgift from '../assets/subgift.png'
import subgiftuser from '../assets/subgiftuser.png'

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

  const icon = (() => {
    if (!active || !event) return normal
    switch (event) {
      case 'sub': {
        return sub
      }
      case 'prime': {
        return prime
      }
      case 'follow': {
        return follow
      }
      case 'subgiftuser': {
        return subgiftuser
      }
      case 'subgift': {
        return subgift
      }
      case 'resubprime': {
        return resubprime
      }
      case 'resub': {
        return resub
      }
      case 'raid': {
        return raid
      }
      case 'bit': {
        return bit
      }
      default: {
        return normal
      }
    }
  })()

  return <animated.img style={{ ...styles }} className="heart" src={icon} />
}

export default Heart
