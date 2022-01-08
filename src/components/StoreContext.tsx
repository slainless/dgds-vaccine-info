import contextFactory from 'Functions/contextFactory'
import type { Location } from 'history'
import type { Locations } from 'types/api'

type Context = {
  lastLocationCache: ReactState<{
    locations: Locations[]
    pathname: string
  } | null>
  detailCache: ReactState<Record<string, Locations>>
  lastScroll: ReactState<Record<string, { left: number; top: number }>>
  locations: ReactState<{
    data: Locations[]
    pathname: string
  } | null>
}
export const {
  context: StoreContext,
  provider: StoreProvider,
  hook: useStoreContext,
} = contextFactory<Context>({
  lastLocationCache: [null, (_) => _],
  detailCache: [{}, (_) => _],
  lastScroll: [{}, (_) => _],
  locations: [null, (_) => _],
})
