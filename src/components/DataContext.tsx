import contextFactory from 'Functions/contextFactory'
import type { Region } from 'types/api'

type Context = {
  regions: Region[] | null
}
export const {
  context: DataContext,
  provider: DataProvider,
  hook: useDataContext,
} = contextFactory<Context>({
  regions: null,
})
