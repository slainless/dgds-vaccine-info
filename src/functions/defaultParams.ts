export default function defaultParams<T, K extends T>(
  params: T,
  defaultParams: K,
): T & K & {} {
  return Object.assign<{}, K, T>({}, defaultParams, params)
}
