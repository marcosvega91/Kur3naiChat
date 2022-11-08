import { ChatEmote, ParsedMessagePart } from '@twurple/common'
import * as React from 'react'
import { useBetterTvEmotes } from './useBetterTvEmotes'

class BetterTvEmote extends ChatEmote {
  getUrl() {
    return `https://cdn.betterttv.net/emote/${this.id}/1x`
  }
}

export function useMessageFormatter(channelId: string) {
  const betterTvEmotesMap = useBetterTvEmotes(channelId)

  const formatter = React.useCallback(
    (message: ParsedMessagePart[]) => {
      return message.reduce<ParsedMessagePart[]>((acc, part) => {
        if (part.type === 'text') {
          const text = part.text
          const textParts = text.split(' ')
          let position = part.position
          const formattedTextParts: ParsedMessagePart[] = []
          for (let i = 0; i < textParts.length; i++) {
            const textPart = textParts[i]
            const emote = betterTvEmotesMap?.[textPart]
            if (emote) {
              formattedTextParts.push({
                type: 'emote',
                position: position,
                length: textPart.length,
                id: emote.id,
                name: emote.code,
                displayInfo: new BetterTvEmote({
                  code: emote.code,
                  id: emote.id,
                }),
              })
              formattedTextParts.push({
                type: 'text',
                position: position + textPart.length,
                length: 1,
                text: ' ',
              })
              position += textPart.length + 1
            } else
              formattedTextParts.push({
                type: 'text',
                position: position,
                length: textPart.length + 1,
                text: textPart + ' ',
              })
            position += textPart.length + 1
          }

          return [...acc, ...formattedTextParts]
        }
        return acc
      }, [])
    },
    [betterTvEmotesMap],
  )

  return formatter
}
