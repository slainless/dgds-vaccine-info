import {
  KipiDetail,
  VidDetail,
  DetailMeta,
  ApiSource,
} from '#/types/definition'
import { locationStruct, successfulResponseStruct } from '#/types/struct'
import { array, is, assert } from 'superstruct'
import type { KipiSuccessfulResponse, VidSuccessfulResponse } from 'types/api'

export class LocationDetail {
  [DetailMeta]: ApiSource
  constructor(input: VidDetail | KipiDetail) {
    Object.assign(this, input)
  }

  isVidDetail(): this is VidDetail {
    return this[DetailMeta] === ApiSource.VAKSINASI_ID
  }

  isKipiDetail(): this is KipiDetail {
    return this[DetailMeta] === ApiSource.KIPI_COVID_19_GO_ID
  }

  get unified() {
    const result = this.isKipiDetail()
      ? {
          title: this.nama,
          registration:
            this.status === 'Siap Vaksinasi' && this.telp != null
              ? 'Hubungi Telepon'
              : 'Walk In',
          address: this.alamat,
          map: `https:\/\/www.google.com\/maps\/dir\/\/?saddr=My+Location%27%20+%20%27&daddr=${this.latitude},${this.longitude}`,
          link: '',
        }
      : this.isVidDetail()
      ? {
          title: this.title,
          registration: this.registration,
          address: this.address,
          map: this.map,
          link: this.link,
        }
      : null

    if (result == null) throw new Error('Object is not valid!')
    return result
  }
}

export function assertVidDetail(
  input: unknown,
): asserts input is VidSuccessfulResponse<VidDetail> {
  if (!is(input, successfulResponseStruct[ApiSource.VAKSINASI_ID]))
    throw new Error('Oops! Looks like there are some error on vaksinasi.id!')

  if (!is(input.data, array(locationStruct[ApiSource.VAKSINASI_ID])))
    throw new Error(
      'Data from vaksinasi.id is conflicting with current schema!',
    )
}

export function assertKipiDetail(
  input: unknown,
): asserts input is KipiSuccessfulResponse<KipiDetail> {
  if (!is(input, successfulResponseStruct[ApiSource.KIPI_COVID_19_GO_ID]))
    throw new Error(
      'Oops! Looks like there are some error on kipi.covid.19.go.id!',
    )
  // if (!is(input.data, array(locationStruct[ApiSource.KIPI_COVID_19_GO_ID]))) {
  //   throw new Error(
  //     'Data from kipi.covid19.go.id is conflicting with current schema!',
  //   )
  // }
  assert(input.data, array(locationStruct[ApiSource.KIPI_COVID_19_GO_ID]))
}
