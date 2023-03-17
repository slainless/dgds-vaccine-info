import {
  RiCommunityLine,
  RiInformationLine,
  RiArrowRightCircleLine,
  RiHospitalLine
} from "../../_snowpack/pkg/react-icons/ri.js";
import {
  MdOutlinePhonelink,
  MdOutlineContactPhone
} from "../../_snowpack/pkg/react-icons/md.js";
var RegistrationMethod;
(function(RegistrationMethod2) {
  RegistrationMethod2["ONLINE"] = "Online";
  RegistrationMethod2["OFFLINE"] = "Walk In";
  RegistrationMethod2["BOTH"] = "Online & Walk In";
})(RegistrationMethod || (RegistrationMethod = {}));
function otherMethodNormalizer(str, detailed) {
  if (str.length > 25 && detailed == false)
    return {
      display: "Cek Detail",
      color: "red",
      icon: RiArrowRightCircleLine
    };
  return {
    display: str,
    color: "purple",
    icon: RiInformationLine
  };
}
export default function regMethodNormalizer(str, detailed = false) {
  if (/offline.*online/gi.test(str) || /online.*offline/gi.test(str))
    return {
      display: detailed ? str : RegistrationMethod.BOTH,
      color: "blue",
      icon: RiCommunityLine
    };
  if (/walk.*in/gi.test(str) || /offline/gi.test(str) || /langsung.*datang/gi.test(str) || /datang.*langsung/gi.test(str) || /langsung.*tempat/gi.test(str) || /on.*the.*spot/gi.test(str))
    return {
      display: detailed ? str : RegistrationMethod.OFFLINE,
      color: "green",
      icon: RiHospitalLine
    };
  if (/online/gi.test(str))
    return {
      display: detailed ? str : RegistrationMethod.ONLINE,
      color: "pink",
      icon: MdOutlinePhonelink
    };
  if (/hubungi.*telepon/gi.test(str))
    return {
      display: detailed ? str : "Telepon",
      color: "teal",
      icon: MdOutlineContactPhone
    };
  return otherMethodNormalizer(str, detailed);
}
