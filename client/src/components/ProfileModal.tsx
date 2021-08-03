import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

import { QuestionForm } from "../smallComps/QuestionForm";
import { ApolloQueryResult } from "@apollo/client";
import { ListUserThreadsQuery } from "../generated/graphql";

interface ProfileModalProps {
  showModal: boolean;
  onClose: () => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  refetchProfileThreads?: () => Promise<
    ApolloQueryResult<ListUserThreadsQuery>
  >;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  onClose,
  showModal,
  setShowModal,
  refetchProfileThreads,
}) => {
  return (
    <>
      <Modal isOpen={showModal} onClose={onClose}>
        <ModalOverlay />
        <ModalContent marginTop="8rem">
          <ModalCloseButton />
          <ModalBody margin="1rem">
            <QuestionForm
              refetchProfileThreads={refetchProfileThreads}
              setShowModal={setShowModal}
              clickedFromProfilePage={true}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
