/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_TWITCH_CHANNEL: string
  readonly VITE_TWITCH_CLIENT_ID: string
  readonly VITE_TWITCH_CLIENT_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
