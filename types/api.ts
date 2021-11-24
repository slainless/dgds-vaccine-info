import type Regions from './regions'
export type Province = typeof Regions[number]['province'] | (string & {})
export type City = typeof Regions[number]['city'][number] | (string & {})
export type Cities = {
  city: City
  province: Province
}
export type Regions = Omit<Cities, 'city'> & {
  city: City[]
}
export type Locations = {
  province: Province
  city: City

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

export type RegionsResponse = EmptyResponse | FilledResponse<Regions> 

export type LocationsResponse = EmptyResponse | ValidationError | FilledResponse<Locations>