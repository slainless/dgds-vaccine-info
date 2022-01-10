import contextFactory from 'Functions/contextFactory'
import type { Location } from 'history'
import type { City, Locations } from 'types/api'
import type Fuse from 'fuse.js'

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
  searchFuse: ReactState<Fuse<City> | null>
  searchInput: ReactState<{
    dropdownData: City[]
    inputValue: string
  } | null>
  locationCache: ReactState<Record<string, Locations>>
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
  searchFuse: [null, (_) => _],
  searchInput: [null, (_) => _],
  locationCache: [{}, (_) => _],
})
