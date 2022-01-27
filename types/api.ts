import type { AnyRegion } from './data'

export interface VidSuccessfulResponse<T> {
  data: T[]
  code: 200
  message: string
}
export interface KipiSuccessfulResponse<T> {
  data: T[]
  count_total: number
  message: 'Success'
  success: true
}

export interface VidEmptyResponse extends VidSuccessfulResponse<void> {
  data: []
  message: 'empty'
}
export interface KipiEmptyResponse extends KipiSuccessfulResponse<void> {
  data: []
  count_total: 0
}

export interface VidFilledResponse<T> extends VidSuccessfulResponse<T> {
  message: 'success'
}
type KipiFilledResponse<T> = KipiSuccessfulResponse<T>

interface ValidationError {
  loc: any[]
  msg: string
  type: string
}

interface HTTPValidationError {
  detail: string | ValidationError
}

export type RegionsResponse = VidEmptyResponse | VidFilledResponse<AnyRegion>

export type LocationsResponse = VidEmptyResponse | ValidationError
// | FilledResponse<Locations>

export type FetchCode = 'region' | 'location'
