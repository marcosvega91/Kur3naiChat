import * as React from 'react'
import { faker } from '@faker-js/faker'
import type { ChannelEvent, UserType } from '../components/glossary'

const events = [
  'message',
  'sub',
  'raid',
  'follow',
  'resub',
  'subgiftuser',
  'subgift',
  'bit',
  'prime',
  'resubprime',
]
const userTypes: UserType[] = ['mod', 'sub', 'vip', 'me', 'none']

export function useFakeEvents(appendEvent: (event: ChannelEvent) => void) {
  return React.useMemo(() => {
    let intervalId: NodeJS.Timeout
    return {
      start: () => {
        intervalId = setInterval(() => {
          const eventType = events[Math.floor(Math.random() * events.length)]

          const event: ChannelEvent | undefined = (() => {
            switch (eventType) {
              case 'message': {
                return {
                  type: 'message',
                  id: faker.database.mongodbObjectId(),
                  userType: userTypes[Math.floor(Math.random() * userTypes.length)],
                  username: faker.internet.userName(),
                  message: faker.lorem.sentence(),
                }
              }
              case 'follow': {
                return {
                  type: 'follow',
                  username: faker.internet.userName(),
                }
              }
              case 'sub': {
                return {
                  type: 'sub',
                  username: faker.internet.userName(),
                }
              }
              case 'prime': {
                return {
                  type: 'prime',
                  username: faker.internet.userName(),
                }
              }
              case 'resubprime': {
                return {
                  type: 'resubprime',
                  username: faker.internet.userName(),
                  numMonths: parseInt(faker.random.numeric(), 10),
                }
              }
              case 'subgiftuser': {
                return {
                  type: 'subgiftuser',
                  username: faker.internet.userName(),
                  recipient: faker.internet.userName(),
                }
              }
              case 'subgift': {
                return {
                  type: 'subgift',
                  username: faker.internet.userName(),
                  count: parseInt(faker.random.numeric(), 10),
                }
              }
              case 'resub': {
                return {
                  type: 'resub',
                  username: faker.internet.userName(),
                  numMonths: parseInt(faker.random.numeric(), 10),
                }
              }
              case 'raid': {
                return {
                  type: 'raid',
                  username: faker.internet.userName(),
                  count: parseInt(faker.random.numeric(), 10),
                }
              }
              case 'bit': {
                return {
                  type: 'bit',
                  username: faker.internet.userName(),
                  count: parseInt(faker.random.numeric(), 10),
                  message: faker.lorem.sentence(),
                }
              }
            }
          })()
          if (event) appendEvent(event)
        }, [3000, 4000, 5000, 6000, 7000][Math.floor(Math.random() * 5)]) // 3-7 seconds
      },
      stop: () => {
        if (intervalId) clearInterval(intervalId)
      },
    }
  }, [appendEvent])
}
