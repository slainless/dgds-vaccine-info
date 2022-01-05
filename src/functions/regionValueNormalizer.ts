import { kebabCase, mapValues, transform, upperFirst } from 'lodash-es'
import type { City, CityValue, ProvinceValue } from 'types/api'

const apiToValueTable: Partial<Record<CityValue | ProvinceValue, string>> = {
  'Kota Makasar': 'Kota Makassar',
}

const valueToApiTable = transform<
  typeof apiToValueTable,
  Record<string, CityValue | ProvinceValue>
>(apiToValueTable, (r, v, k) => (r[v!] = k))

const urlToValueTable: Record<string, string> = {
  'kab-tojo-una-una': 'Kab. Tojo Una-Una',
  'kab-toli-toli': 'Kab. Toli-Toli',
  'dki-jakarta': 'DKI Jakarta',
  'di-yogyakarta': 'DI Yogyakarta',
}

/** *Will not validate value. Only contains basic api value fix* */
export function apiToValue(city: City) {
  return mapValues(city, (v) => apiToValueTable[v] ?? v)
}

/** *Will not validate value. Only contains basic api value fix* */
export function valueToApi(city: { city: string; province: string }): City {
  return mapValues(city, (v) => valueToApiTable[v] ?? v)
}

/** *Will not validate value* */
export function valueToUrl(city: City) {
  return mapValues(city, (v) => kebabCase(v).replace('.', ''))
}

/** *Will not validate value. Only contains basic value fix* */
export function urlToValue(city: { city: string; province: string }) {
  return mapValues(
    city,
    (v) =>
      urlToValueTable[v] ??
      v.split('-').map(upperFirst).join(' ').replace(/^Kab /, 'Kab. '),
  )
}
