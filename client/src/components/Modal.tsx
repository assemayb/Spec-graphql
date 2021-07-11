import React, { useState } from "react";
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

import { LoginFrom } from "./LoginFrom";
import { RegisterFrom } from "./RegisterForm";
interface ModalComponentProps {
  showModal: boolean;
  onClose: () => void;
}

export const ModalComponent: React.FC<ModalComponentProps> = ({
  showModal,
  onClose,
}) => {
  const [displayedForm, setDisplayedForm] = useState("loginForm");
  return (
    <>
      <Modal isOpen={showModal} onClose={onClose}>
        <ModalOverlay />
        <ModalContent marginTop="8rem">
          <ModalCloseButton />

          <ModalBody margin="2rem" padding="1rem">
            {displayedForm === "loginForm" ? <LoginFrom /> : <RegisterFrom />}
          </ModalBody>

          <ModalFooter display="flex" justifyContent="center">
            <Button
              bgColor="blue.200"
              textAlign="center"
              onClick={() => {
                if (displayedForm === "loginForm") {
                  setDisplayedForm("signupForm");
                } else {
                  setDisplayedForm("loginForm");
                }
              }}
            >
              {displayedForm === "loginForm"
                ? "create an account"
                : "login to your acccount"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
