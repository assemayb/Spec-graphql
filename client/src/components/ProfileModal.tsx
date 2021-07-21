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
  Heading,
} from "@chakra-ui/react";

import {QuestionForm} from "../smallComps/QuestionForm"

interface ProfileModalProps {
  showModal: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
    onClose,
    showModal
 }) => {

  return (
    <>
      <Modal isOpen={showModal} onClose={onClose}>
        <ModalOverlay />
        <ModalContent marginTop="8rem">
          <ModalCloseButton />

          <ModalBody margin="1rem">
                <QuestionForm clickedFromProfilePage={true}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
