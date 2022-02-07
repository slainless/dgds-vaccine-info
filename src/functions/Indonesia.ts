import {
  kebabCase,
  lowerCase,
  mapValues,
  startCase,
  transform,
} from 'lodash-es'
import type { AnyRegion, AnyCity } from 'types/api'
import type {
  UCity,
  URegion,
  UCityValue,
  UProvinceValue,
} from '#/types/definition'
import { ApiSource } from '#/types/definition'
import TranslationTable from './Translation'

type FixTable = Record<
  ApiSource | 'url',
  TranslationTable<string, UCityValue | UProvinceValue>
>

// A <=> B
// A = API
// B = Data
const fixTable: FixTable = {
  [ApiSource.VAKSINASI_ID]: new TranslationTable<string, UCityValue>([
    ['Kota Makasar', 'Kota Makassar'],
  ]),
  [ApiSource.KIPI_COVID_19_GO_ID]: new TranslationTable<string, UCityValue>([
    ['KAB. TOJO UNA UNA', 'Kab. Tojo Una-Una'],
    ['KAB. TOLI TOLI', 'Kab. Toli-Toli'],
    ['YOGYAKARTA', 'DI Yogyakarta'],
    ['DKI JAKARTA', 'DKI Jakarta'],
  ]),
  url: new TranslationTable<string, UCityValue>([
    ['kab-tojo-una-una', 'Kab. Tojo Una-Una'],
    ['kab-toli-toli', 'Kab. Toli-Toli'],
    ['di-yogyakarta', 'DI Yogyakarta'],
    ['dki-jakarta', 'DKI Jakarta'],
  ]),
}

export default class Indonesia {
  cities: UCity[]
  constructor(regions: AnyRegion[]) {
    const fixedCity = []
    const fixedProvince = []
    this.cities = regions
      .map((region) =>
        region.city.map((city) => {
          return mapValues(
            {
              city,
              province: region.province,
            },
            (v) => fixTable[ApiSource.VAKSINASI_ID].atob(v) ?? v,
          ) as UCity
        }),
      )
      .flat()
  }

  province(province: UProvinceValue): URegion {
    const cities = this.cities
      .filter((city) => city.province === province)
      .map((v) => v.city)
    return {
      province,
      city: cities,
    }
  }

  // B (unified data) => A (api)
  toApi(city: UCity, target: ApiSource | 'url'): AnyCity {
    const table = fixTable[target]
    // translate from unified data to api
    const translated = mapValues(city, (v) => table.btoa(v) ?? v)

    if (target === ApiSource.KIPI_COVID_19_GO_ID)
      // if it's KIPI API, then transform the text to uppercase
      return mapValues(translated, (v) => v.toUpperCase())
    else if (target === 'url') return mapValues(translated, (v) => kebabCase(v))
    else return translated
  }

  // A (api) => B (unified data)
  toUnified(city: AnyCity, source: ApiSource | 'url'): AnyCity {
    const table = fixTable[source]
    if (source === ApiSource.KIPI_COVID_19_GO_ID) {
      // transform only untranslated value
      // lowerCase -> startCase -> replace 'Kab '=>'Kab. '
      return mapValues(
        city,
        (v) =>
          table.atob(v) ?? startCase(lowerCase(v)).replace(/^Kab /, 'Kab. '),
      )
    } else if (source === ApiSource.VAKSINASI_ID)
      return mapValues(city, (v) => table.atob(v) ?? v)
    else if (source === 'url')
      return mapValues(
        city,
        (v) => table.atob(v) ?? startCase(v).replace(/^Kab /, 'Kab. '),
      )
    throw new Error('Source not allowed.')
  }

  toValidUnified(city: AnyCity, source: ApiSource | 'url') {
    const unified = this.toUnified(city, source)
    return (
      this.cities.find(
        ({ city, province }) =>
          city == unified.city && province == unified.province,
      ) ?? null
    )
  }
}
