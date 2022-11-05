export type UserType = 'mod' | 'sub' | 'vip' | 'me' | 'none'

export interface ChannelMessage {
  type: 'message'
  id: string
  username: string
  userType: UserType
  message: string
}

export interface UserAction {
  id: number
  username: string
}

export type ChannelSub = UserAction & {
  type: 'sub'
}

export type ChannelSubTier2 = UserAction & {
  type: 'subtier2'
}

export type ChannelSubTier3 = UserAction & {
  type: 'subtier3'
}

export type ChannelPrime = UserAction & {
  type: 'prime'
}

export type ChannelReSubPrime = UserAction & {
  type: 'resubprime'
  numMonths: number
}

export type ChannelSubGiftToUser = UserAction & {
  type: 'subgiftuser'
  recipient: string
}

export type ChannelSubGift = UserAction & {
  type: 'subgift'
  count: number
}

export type ChannelReSub = UserAction & {
  type: 'resub'
  numMonths: number
}

export type ChannelReSubTier2 = UserAction & {
  type: 'resubtier2'
  numMonths: number
}

export type ChannelReSubTier3 = UserAction & {
  type: 'resubtier3'
  numMonths: number
}

export type ChannelRaid = UserAction & {
  type: 'raid'
  count: number
}

export type ChannelFollow = UserAction & {
  type: 'follow'
}

export type ChannelBit = UserAction & {
  type: 'bit'
  count: number
  message: string
}

export type ChannelEvent =
  | ChannelSub
  | ChannelSubTier2
  | ChannelSubTier3
  | ChannelMessage
  | ChannelFollow
  | ChannelRaid
  | ChannelReSub
  | ChannelReSubTier2
  | ChannelReSubTier3
  | ChannelSubGiftToUser
  | ChannelSubGift
  | ChannelBit
  | ChannelPrime
  | ChannelReSubPrime
