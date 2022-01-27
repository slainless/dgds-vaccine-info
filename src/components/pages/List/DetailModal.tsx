import {
  Button,
  Container,
  Icon,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import type { LocationDetail } from 'types/data'
import TheLocation from 'Components/pages/Detail/TheDetail'
import LocationBackButton from 'Components/pages/Detail/BackButton'
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri'

export default function DetailModel(props: {
  isOpen: boolean
  onClose: () => void
  detail: LocationDetail | null
}) {
  const { isOpen, onClose, detail, ...rest } = props
  useEffect(() => {
    if (isOpen === false) return
    console.log('Opened', detail)
  })
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        {/* <ModalHeader>Modal Title</ModalHeader> */}
        {/* <ModalCloseButton /> */}
        <ModalBody alignItems="center" bgColor="gray.50" px={0} pb={14}>
          <Container layerStyle="constraint-sm" py={3}>
            <Link
              alignItems="center"
              ml="auto"
              p={0}
              display="flex"
              gridGap={2}
              width="max-content"
              opacity={0.8}
              // fontFamily="heading"
              href="javascript:;"
              onClick={() => onClose()}
            >
              Kembali
              <Icon as={RiArrowRightLine} />
            </Link>
          </Container>
          <TheLocation data={detail} />
        </ModalBody>

        {/* <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  )
}
