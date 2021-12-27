import type Regions from './regions'
export type ProvinceValue = typeof Regions[number]['province'] | (string & {})
export type CityValue = typeof Regions[number]['city'][number] | (string & {})
export type City = {
  city: CityValue
  province: ProvinceValue
}
export type Region = Omit<City, 'city'> & {
  city: CityValue[]
}
export type Locations = {
  province: ProvinceValue
  city: CityValue

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

export interface SuccessfulResponse<T> {
  data: T[]
  code: 200
  message: string
}

export interface EmptyResponse extends SuccessfulResponse<void> {
  data: []
  message: 'empty'
}

export interface FilledResponse<T> extends SuccessfulResponse<T> {
  message: 'success'
}

interface ValidationError {
  loc: any[]
  msg: string
  type: string
}

interface HTTPValidationError {
  detail: string | ValidationError
}

export type RegionsResponse = EmptyResponse | FilledResponse<Region>

export type LocationsResponse =
  | EmptyResponse
  | ValidationError
  | FilledResponse<Locations>
