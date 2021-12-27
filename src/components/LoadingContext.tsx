import contextFactory from 'Functions/contextFactory'

type Context = {
  loading: ReactState<boolean>
  progress: ReactState<number>
}
export const {
  context: LoadingContext,
  provider: LoadingProvider,
  hook: useLoadingContext,
} = contextFactory<Context>({
  loading: [false, (_) => _],
  progress: [0, (_) => _],
})
