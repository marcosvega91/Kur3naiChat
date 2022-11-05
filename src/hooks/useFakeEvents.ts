import * as React from 'react'
import { faker } from '@faker-js/faker'
import type { ChannelEvent, UserType } from '../components/glossary'

const events = [
  'message',
  'sub',
  'subtier2',
  'subtier3',
  'raid',
  'follow',
  'resub',
  'resubtier2',
  'resubtier3',
  'subgiftuser',
  'subgift',
  'bit',
  'prime',
  'resubprime',
]
const userTypes: UserType[] = ['mod', 'sub', 'vip', 'me', 'none']

export function useFakeEvents(appendEvent: (event: ChannelEvent) => void) {
  const fakeId = React.useRef(0)
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
                  id: fakeId.current++,
                  type: 'follow',
                  username: faker.internet.userName(),
                }
              }
              case 'sub': {
                return {
                  id: fakeId.current++,
                  type: 'sub',
                  username: faker.internet.userName(),
                }
              }
              case 'subtier2': {
                return {
                  id: fakeId.current++,
                  type: 'subtier2',
                  username: faker.internet.userName(),
                }
              }
              case 'subtier3': {
                return {
                  id: fakeId.current++,
                  type: 'subtier3',
                  username: faker.internet.userName(),
                }
              }
              case 'prime': {
                return {
                  id: fakeId.current++,
                  type: 'prime',
                  username: faker.internet.userName(),
                }
              }
              case 'resubprime': {
                return {
                  id: fakeId.current++,
                  type: 'resubprime',
                  username: faker.internet.userName(),
                  numMonths: parseInt(faker.random.numeric(), 10),
                }
              }
              case 'subgiftuser': {
                return {
                  id: fakeId.current++,
                  type: 'subgiftuser',
                  username: faker.internet.userName(),
                  recipient: faker.internet.userName(),
                }
              }
              case 'subgift': {
                return {
                  id: fakeId.current++,
                  type: 'subgift',
                  username: faker.internet.userName(),
                  count: parseInt(faker.random.numeric(), 10),
                }
              }
              case 'resub': {
                return {
                  id: fakeId.current++,
                  type: 'resub',
                  username: faker.internet.userName(),
                  numMonths: parseInt(faker.random.numeric(), 10),
                }
              }
              case 'resubtier2': {
                return {
                  id: fakeId.current++,
                  type: 'resubtier2',
                  username: faker.internet.userName(),
                  numMonths: parseInt(faker.random.numeric(), 10),
                }
              }
              case 'resubtier3': {
                return {
                  id: fakeId.current++,
                  type: 'resubtier3',
                  username: faker.internet.userName(),
                  numMonths: parseInt(faker.random.numeric(), 10),
                }
              }
              case 'raid': {
                return {
                  id: fakeId.current++,
                  type: 'raid',
                  username: faker.internet.userName(),
                  count: parseInt(faker.random.numeric(), 10),
                }
              }
              case 'bit': {
                return {
                  id: fakeId.current++,
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
