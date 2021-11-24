import * as s from 'superstruct'
import type { SuccessfulResponse } from 'types/api'

const successfulResponseStruct: s.Describe<SuccessfulResponse<any>> = s.object({
  data: s.array(s.any()),
  code: s.literal(200),
  message: s.string()
})

export default function isValidResponse<T = any>(res: any): res is SuccessfulResponse<T> {
  return s.is(res, successfulResponseStruct)
}