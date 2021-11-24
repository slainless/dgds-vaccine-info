import * as s from 'superstruct'
import type { Regions } from 'types/api'

const regionsStruct: s.Describe<Regions[]> = s.array(s.object({
  province: s.string(),
  city: s.array(s.string())
}))

export default function isValidRegions(res: any[]): res is Regions[] {
  return s.is(res, regionsStruct)
}