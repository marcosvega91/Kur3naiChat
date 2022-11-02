import * as React from 'react'
import { ClientCredentialsAuthProvider } from '@twurple/auth'

export function useTwitchProvider(clientId: string, clientSecret: string) {
  return React.useMemo(() => {
    return new ClientCredentialsAuthProvider(clientId, clientSecret)
  }, [clientId, clientSecret])
}
