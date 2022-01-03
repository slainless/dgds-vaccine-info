import * as s from 'superstruct'
import type { Region } from 'types/api'

const regionsStruct: s.Describe<Region[]> = s.array(
  s.object({
    province: s.string(),
    city: s.array(s.string()),
  }),
)

export default function isValidRegions(res: any[]): res is Region[] {
  return s.is(res, regionsStruct)
}
