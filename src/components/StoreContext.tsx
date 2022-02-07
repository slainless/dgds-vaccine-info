import contextFactory from 'Functions/contextFactory'
import type { Location } from 'history'
import type { UCity, VidDetail } from '#/types/definition'
import type { LocationDetail } from 'Functions/Location'
import type Fuse from 'fuse.js'
import type Indonesia from 'Functions/Indonesia'

type Context = {
  lastScroll: ReactState<Record<string, { left: number; top: number }>>
  locations: ReactState<{
    data: VidDetail[]
    pathname: string
  } | null>
  searchFuse: ReactState<Fuse<UCity> | null>
  searchInput: ReactState<{
    dropdownData: UCity[]
    inputValue: string
  } | null>
  regions: ReactState<Indonesia | null>
}
export const {
  context: StoreContext,
  provider: StoreProvider,
  hook: useStoreContext,
} = contextFactory<Context>({
  lastScroll: [{}, (_) => _],
  locations: [null, (_) => _],
  searchFuse: [null, (_) => _],
  searchInput: [null, (_) => _],
  regions: [null, (_) => _],
})
