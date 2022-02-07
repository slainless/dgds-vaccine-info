import type { IconType } from 'react-icons'
import {
  RiCommunityLine,
  RiBuilding4Line,
  RiHome5Line,
  RiInformationLine,
  RiMoreFill,
  RiAddCircleLine,
  RiArrowRightCircleLine,
  RiHospitalLine,
  RiBuildingFill,
} from 'react-icons/ri'
import {
  MdOutlinePhonelink,
  MdTapAndPlay,
  MdLocalHospital,
  MdOutlineLocalPhone,
  MdOutlineContactPhone,
} from 'react-icons/md'
import { HiOutlineStatusOnline } from 'react-icons/hi'

enum RegistrationMethod {
  ONLINE = 'Online',
  OFFLINE = 'Walk In',
  BOTH = 'Online & Walk In',
}

function otherMethodNormalizer(
  str: string,
  detailed: boolean,
): {
  display: RegistrationMethod | string
  color: string
  icon: IconType
} {
  if (str.length > 25 && detailed == false)
    return {
      display: 'Cek Detail',
      color: 'red',
      icon: RiArrowRightCircleLine,
    }
  return {
    display: str,
    color: 'purple',
    icon: RiInformationLine,
  }
}

export default function regMethodNormalizer(
  str: string,
  detailed = false,
): {
  display: RegistrationMethod | string
  color: string
  icon: IconType
} {
  if (/offline.*online/gi.test(str) || /online.*offline/gi.test(str))
    return {
      display: detailed ? str : RegistrationMethod.BOTH,
      color: 'blue',
      icon: RiCommunityLine,
    }

  if (
    /walk.*in/gi.test(str) ||
    /offline/gi.test(str) ||
    /langsung.*datang/gi.test(str) ||
    /datang.*langsung/gi.test(str) ||
    /langsung.*tempat/gi.test(str) ||
    /on.*the.*spot/gi.test(str)
  )
    return {
      display: detailed ? str : RegistrationMethod.OFFLINE,
      color: 'green',
      icon: RiHospitalLine,
    }

  if (/online/gi.test(str))
    return {
      display: detailed ? str : RegistrationMethod.ONLINE,
      color: 'pink',
      icon: MdOutlinePhonelink,
    }

  if (/hubungi.*telepon/gi.test(str))
    return {
      display: detailed ? str : 'Telepon',
      color: 'teal',
      icon: MdOutlineContactPhone,
    }

  return otherMethodNormalizer(str, detailed)
}
