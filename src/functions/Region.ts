import { ApiSource } from '#/types/definition'
import { regionsStruct, successfulResponseStruct } from '#/types/struct'
import { array, assert, is } from 'superstruct'
import type { AnyRegion, VidSuccessfulResponse } from 'types/api'

export function assertRegion(
  input: unknown,
): asserts input is VidSuccessfulResponse<AnyRegion> {
  if (!is(input, successfulResponseStruct[ApiSource.VAKSINASI_ID]))
    throw new Error(
      'Oops! Looks like there are some error on kipi.covid.19.go.id!',
    )

  console.log(input.data)
  assert(input.data, array(regionsStruct))
}
