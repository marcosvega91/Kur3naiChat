import * as React from 'react'
import { ChannelEvent } from '../components/glossary'

export function useDebounceAppend(appendFn: (event: ChannelEvent) => void, delay: number) {
  const events = React.useRef<ChannelEvent[]>([])
  const lastTimeout = React.useRef<NodeJS.Timeout>()

  const startTimeout = React.useCallback(() => {
    return setTimeout(() => {
      appendFn(events.current[0])
      console.log(events)
      events.current = [...events.current.slice(1)]
      if (events.current.length > 0) {
        lastTimeout.current = startTimeout()
      } else {
        lastTimeout.current = undefined
      }
    }, delay)
  }, [delay, appendFn])

  const append = React.useCallback(
    (event: ChannelEvent) => {
      events.current.push(event)
      if (lastTimeout.current) {
        return
      }
      lastTimeout.current = startTimeout()
    },
    [startTimeout],
  )

  return append
}
