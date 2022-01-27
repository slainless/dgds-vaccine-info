import s from 'superstruct'
import type { AnyRegion } from 'types/data'

const regionsStruct: s.Describe<AnyRegion[]> = s.array(
  s.object({
    province: s.string(),
    city: s.array(s.string()),
  }),
)

export default function isValidRegions(res: any[]): res is AnyRegion[] {
  return s.is(res, regionsStruct)
}
