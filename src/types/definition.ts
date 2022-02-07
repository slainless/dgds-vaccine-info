import type Regions from 'types/regions'
export type { AnyCity, AnyRegion } from 'types/api'

// U = Universal
export type UProvinceValue = typeof Regions[number]['province'] | (string & {})
export type UCityValue = typeof Regions[number]['city'][number] | (string & {})
export type UCity = {
  city: UCityValue
  province: UProvinceValue
}
/** Unified region object */
export type URegion = Omit<UCity, 'city'> & {
  city: UCityValue[]
}

export const DetailMeta = Symbol('detail-meta')

export type KipiDetail = {
  id: number
  kode: string
  nama: string
  kota: string
  provinsi: string
  alamat: string
  latitude: string
  longitude: string
  telp: string | null
  jenis_faskes: string
  kelas_rs: string
  status: string
  detail: Array<{
    id: number
    kode: string
    batch: string
    divaksin: number
    divaksin_1: number
    divaksin_2: number
    batal_vaksin: number
    batal_vaksin_1: number
    batal_vaksin_2: number
    pending_vaksin: number
    pending_vaksin_1: number
    pending_vaksin_2: number
    tanggal: string
  }>
  source_data: string
  [DetailMeta]: ApiSource.KIPI_COVID_19_GO_ID
}

export type VidDetail = {
  province: UProvinceValue
  city: UCityValue

  title: string
  description: string
  link: string

  address: string
  map: string

  registration: string
  agerange: string[]
  isfree: boolean

  datestart: string
  dateend: string
  timestart: string
  timeend: string

  isvalid: boolean
  code: string
  dateadded: string
  [DetailMeta]: ApiSource.VAKSINASI_ID
}

export const enum ApiSource {
  VAKSINASI_ID = 'vaksinasi.id',
  KIPI_COVID_19_GO_ID = 'kipi.covid19.go.id',
}
