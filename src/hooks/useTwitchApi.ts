import { ApiClient } from '@twurple/api'
import * as React from 'react'
import { useTwitchProvider } from './useTwitchProvider'

export function useTwitchApi(clientId: string, clientSecret: string) {
  const authProvider = useTwitchProvider(clientId, clientSecret)
  return React.useMemo(() => {
    return new ApiClient({ authProvider })
  }, [authProvider])
}
