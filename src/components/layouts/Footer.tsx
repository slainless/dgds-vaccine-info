import {
  Container,
  HStack,
  Text,
  Box,
  Grid,
  Button,
  Icon,
} from '@chakra-ui/react'
import { useLoadingContext } from 'Components/LoadingContext'
import { useEffect, useMemo } from 'react'
import type { IconType } from 'react-icons'
import {
  MdOutlineMedicalServices,
  MdOutlineHome,
  MdInfoOutline,
} from 'react-icons/md'
import { NavLink as RouterLink, useLocation } from 'react-router-dom'
import { useStoreContext } from 'Components/StoreContext'

function NavButton(
  props: Parameters<typeof Button>[0] &
    Parameters<typeof RouterLink>[0] & {
      // text: string
      icon?: IconType
    },
) {
  const { children, icon: PIcon, ...rest } = props
  const LinkUsed = props.to === '#' ? Button : RouterLink

  return (
    <Button
      as={LinkUsed}
      size="sm"
      height="initial"
      variant="ghost"
      borderRadius="none"
      display="flex"
      flexDir="column"
      w={24}
      sx={{
        '&.active': {
          color: 'green.600',
        },
      }}
      _disabled={{
        bgColor: 'white',
      }}
      {...rest}
    >
      <Icon as={PIcon} boxSize={7} />
      {children}
    </Button>
  )
}

export default function LayoutFooter() {
  const location = useLocation()
  const { isLoading } = useLoadingContext()
  const {
    locations: [locations],
  } = useStoreContext()

  const locationLink = useMemo(() => {
    // alert('changing location!')
    return locations?.pathname ?? null
  }, [locations])
  return (
    <Box
      width="full"
      bgColor="white"
      borderTop="1px solid"
      borderTopColor="gray.200"
      height={14}
      position="fixed"
      bottom={0}
      zIndex={1410}
    >
      <Container
        maxW="container.sm"
        height="inherit"
        justifyContent="center"
        display="flex"
      >
        <Grid
          templateColumns="repeat(3, max-content)"
          gridGap={5}
          height="inherit"
          justifyItems="center"
        >
          <NavButton icon={MdOutlineHome} to="/">
            Beranda
          </NavButton>
          <NavButton
            icon={MdOutlineMedicalServices}
            to={locationLink ?? '#'}
            disabled={locationLink == null}
          >
            Lokasi
          </NavButton>
          <NavButton icon={MdInfoOutline} to={'#'} disabled>
            Informasi
          </NavButton>
        </Grid>
      </Container>
    </Box>
  )
}
