import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

import { LoginFrom } from "./LoginFrom";
interface ModalComponentProps {
  showModal: boolean;
  onClose: () => void;
}

export const ModalComponent: React.FC<ModalComponentProps> = ({
  showModal,
  onClose,
}) => {
  return (
    <>
      <Modal isOpen={showModal} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody marginTop="2rem" padding="1rem">
            <LoginFrom />
          </ModalBody>

          <ModalFooter>
          create an acount here
            {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button> */}
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
