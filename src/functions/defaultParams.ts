export default function defaultParams<T, K>(
  params: T,
  defaultParams: Partial<T> & K,
): T & K & {} {
  return Object.assign<{}, Partial<T> & K, T>({}, defaultParams, params)
}
