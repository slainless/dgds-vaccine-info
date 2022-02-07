import type {
  AnyRegion,
  KipiSuccessfulResponse,
  VidSuccessfulResponse,
} from 'types/api'
import { ApiSource, KipiDetail, VidDetail, DetailMeta } from './definition'
import * as s from 'superstruct'

export const regionsStruct: s.Describe<AnyRegion> = s.object({
  province: s.string(),
  city: s.array(s.string()),
})

export const successfulResponseStruct: {
  [ApiSource.VAKSINASI_ID]: s.Describe<VidSuccessfulResponse<any>>
  [ApiSource.KIPI_COVID_19_GO_ID]: s.Describe<KipiSuccessfulResponse<any>>
} = {
  [ApiSource.VAKSINASI_ID]: s.object({
    data: s.array(s.any()),
    code: s.literal(200),
    message: s.string(),
  }),
  [ApiSource.KIPI_COVID_19_GO_ID]: s.object({
    data: s.array(s.any()),
    count_total: s.number(),
    message: s.literal('Success'),
    success: s.literal(true),
  }),
}

export const locationStruct: {
  [ApiSource.VAKSINASI_ID]: s.Describe<Omit<VidDetail, typeof DetailMeta>>
  [ApiSource.KIPI_COVID_19_GO_ID]: s.Describe<
    Omit<KipiDetail, typeof DetailMeta>
  >
} = {
  [ApiSource.VAKSINASI_ID]: s.object({
    province: s.string(),
    city: s.string(),

    title: s.string(),
    description: s.string(),
    link: s.string(),

    address: s.string(),
    map: s.string(),

    registration: s.string(),
    agerange: s.array(s.string()),
    isfree: s.boolean(),

    datestart: s.string(),
    dateend: s.string(),
    timestart: s.string(),
    timeend: s.string(),

    isvalid: s.boolean(),
    code: s.string(),
    dateadded: s.string(),
  }),
  [ApiSource.KIPI_COVID_19_GO_ID]: s.object({
    id: s.number(),
    kode: s.string(),
    nama: s.string(),
    kota: s.string(),
    provinsi: s.string(),
    alamat: s.string(),
    latitude: s.string(),
    longitude: s.string(),
    telp: s.nullable(s.string()),
    jenis_faskes: s.string(),
    kelas_rs: s.string(),
    status: s.string(),
    detail: s.array(
      s.object({
        id: s.number(),
        kode: s.string(),
        batch: s.string(),
        divaksin: s.number(),
        divaksin_1: s.number(),
        divaksin_2: s.number(),
        batal_vaksin: s.number(),
        batal_vaksin_1: s.number(),
        batal_vaksin_2: s.number(),
        pending_vaksin: s.number(),
        pending_vaksin_1: s.number(),
        pending_vaksin_2: s.number(),
        tanggal: s.string(),
      }),
    ),
    source_data: s.string(),
  }),
}
