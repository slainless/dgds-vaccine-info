import { useContext } from 'react'

export default function contextFactory<T>(defaultValue: T) {
  const context = React.createContext<T>(defaultValue)
  const provider = context.Provider
  const hook = () => {
    const ctx = useContext(context)
    return ctx
  }
  return {
    context,
    provider,
    hook,
  }
}
