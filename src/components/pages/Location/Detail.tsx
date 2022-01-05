import type { Locations } from 'types/api'

export default function LocationDetail(props: { data: Locations | null }) {
  const { data, ...rest } = props
  return <>{data?.title}</>
}
