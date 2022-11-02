import * as React from 'react'
import type { HelixUser } from '@twurple/api'
import { useTwitchApi } from './useTwitchApi'

type FollowCallback = (username: string) => void

export function useTwitchFollow(channel: string, clientId: string, clientSecret: string) {
  const [lastFollowers, setLastFollowers] = React.useState<string[]>()
  const twitchApi = useTwitchApi(clientId, clientSecret)
  const [user, setUser] = React.useState<HelixUser>()
  const [followCallback, setFollowCallback] = React.useState<FollowCallback>()

  const twitchFollow = React.useMemo(() => {
    return {
      onFollow: (callback: FollowCallback) => {
        setFollowCallback(() => callback)
      },
    }
  }, [])

  React.useEffect(() => {
    twitchApi.users.getUserByName(channel).then((user) => {
      if (user) setUser(user)
    })
  }, [twitchApi])

  React.useEffect(() => {
    if (user) {
      const intervalId = setInterval(() => {
        twitchApi.users
          .getFollows({
            limit: 100,
            followedUser: user.id,
          })
          .then((paginatedResults) => {
            console.log(paginatedResults)
            if (paginatedResults.data.length > 0) {
              if (!lastFollowers) {
                setLastFollowers(paginatedResults.data.map(({ userId }) => userId))
              } else {
                for (let index = 0; index < paginatedResults.data.length; index++) {
                  if (!lastFollowers.includes(paginatedResults.data[index].userId)) {
                    followCallback?.(paginatedResults.data[index].userName)
                  }
                }
                setLastFollowers(paginatedResults.data.map(({ userId }) => userId))
              }
            }
          })
      }, 5 * 1000)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [user, twitchApi, followCallback, lastFollowers])

  return twitchFollow
}
