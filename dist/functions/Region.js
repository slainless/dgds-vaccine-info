import {ApiSource} from "../types/definition.js";
import {regionsStruct, successfulResponseStruct} from "../types/struct.js";
import {array, assert, is} from "../../_snowpack/pkg/superstruct.js";
export function assertRegion(input) {
  if (!is(input, successfulResponseStruct[ApiSource.VAKSINASI_ID]))
    throw new Error("Oops! Looks like there are some error on kipi.covid.19.go.id!");
  console.log(input.data);
  assert(input.data, array(regionsStruct));
}
