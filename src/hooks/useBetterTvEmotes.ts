import * as React from 'react'

interface Emote {
  id: string
  code: string
  imageType: string
  userId: string
}

interface UserEmotes {
  id: string
  bots: string[]
  avatar: string
  channelEmotes: Emote[]
  sharedEmotes: Emote[]
}

export function useBetterTvEmotes(channelId: string) {
  const [emotesMap, setEmotesMap] = React.useState<Record<string, Emote>>()
  React.useEffect(() => {
    fetch('https://api.betterttv.net/3/cached/emotes/global')
      .then((response) => {
        if (response.ok) return response.json()
      })
      .then((emotes: Emote[]) => {
        const emotesMap: Record<string, Emote> = {}
        emotes.forEach((emote) => {
          emotesMap[emote.code] = emote
        })
        setEmotesMap((currentMap) => {
          return {
            ...currentMap,
            ...emotesMap,
          }
        })
      })
  }, [])

  React.useEffect(() => {
    fetch(`https://api.betterttv.net/3/cached/users/twitch/${channelId}`)
      .then((response) => {
        if (response.ok) return response.json()
      })
      .then((useEmotes: UserEmotes) => {
        const emotesMap: Record<string, Emote> = {}
        useEmotes.channelEmotes.forEach((emote) => {
          emotesMap[emote.code] = emote
        })
        useEmotes.sharedEmotes.forEach((emote) => {
          emotesMap[emote.code] = emote
        })
        setEmotesMap((currentMap) => {
          return {
            ...currentMap,
            ...emotesMap,
          }
        })
      })
  }, [channelId])

  return emotesMap
}
