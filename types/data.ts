import type Regions from './regions'

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

// Any = Arbitrary
/** Any arbitrary city object */
export type AnyCity = { city: string; province: string }
/** Any arbitrary region object */
export type AnyRegion = Omit<AnyCity, 'city'> & {
  city: string[]
}

export type LocationDetail = KipiDetail | VidDetail
export type KipiDetail = {
  id: number
  kode: string
  nama: string
  kota: string
  provinsi: string
  alamat: string
  latitude: string
  longitude: string
  telp: string
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
}
