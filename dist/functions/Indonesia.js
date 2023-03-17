import {
  kebabCase,
  lowerCase,
  mapValues,
  startCase
} from "../../_snowpack/pkg/lodash-es.js";
import {ApiSource} from "../types/definition.js";
import TranslationTable from "./Translation.js";
const fixTable = {
  [ApiSource.VAKSINASI_ID]: new TranslationTable([
    ["Kota Makasar", "Kota Makassar"]
  ]),
  [ApiSource.KIPI_COVID_19_GO_ID]: new TranslationTable([
    ["KAB. TOJO UNA UNA", "Kab. Tojo Una-Una"],
    ["KAB. TOLI TOLI", "Kab. Toli-Toli"],
    ["YOGYAKARTA", "DI Yogyakarta"],
    ["DKI JAKARTA", "DKI Jakarta"]
  ]),
  url: new TranslationTable([
    ["kab-tojo-una-una", "Kab. Tojo Una-Una"],
    ["kab-toli-toli", "Kab. Toli-Toli"],
    ["di-yogyakarta", "DI Yogyakarta"],
    ["dki-jakarta", "DKI Jakarta"]
  ])
};
export default class Indonesia {
  constructor(regions) {
    const fixedCity = [];
    const fixedProvince = [];
    this.cities = regions.map((region) => region.city.map((city) => {
      return mapValues({
        city,
        province: region.province
      }, (v) => fixTable[ApiSource.VAKSINASI_ID].atob(v) ?? v);
    })).flat();
  }
  province(province) {
    const cities = this.cities.filter((city) => city.province === province).map((v) => v.city);
    return {
      province,
      city: cities
    };
  }
  toApi(city, target) {
    const table = fixTable[target];
    const translated = mapValues(city, (v) => table.btoa(v) ?? v);
    if (target === ApiSource.KIPI_COVID_19_GO_ID)
      return mapValues(translated, (v) => v.toUpperCase());
    else if (target === "url")
      return mapValues(translated, (v) => kebabCase(v));
    else
      return translated;
  }
  toUnified(city, source) {
    const table = fixTable[source];
    if (source === ApiSource.KIPI_COVID_19_GO_ID) {
      return mapValues(city, (v) => table.atob(v) ?? startCase(lowerCase(v)).replace(/^Kab /, "Kab. "));
    } else if (source === ApiSource.VAKSINASI_ID)
      return mapValues(city, (v) => table.atob(v) ?? v);
    else if (source === "url")
      return mapValues(city, (v) => table.atob(v) ?? startCase(v).replace(/^Kab /, "Kab. "));
    throw new Error("Source not allowed.");
  }
  toValidUnified(city, source) {
    const unified = this.toUnified(city, source);
    return this.cities.find(({city: city2, province}) => city2 == unified.city && province == unified.province) ?? null;
  }
}
