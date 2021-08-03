import {
  Flex,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAddReplyMutation, useMeLazyQuery } from "../generated/graphql";

interface AddReplyModalProps {
  showModal: boolean;
  setShowModal: any;
  threadId: number;
  refetch: () => any;
}
export const AddReplyModal: React.FC<AddReplyModalProps> = ({
  showModal,
  setShowModal,
  threadId,
  refetch,
}) => {
  const [getUserData, { data }] = useMeLazyQuery({
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    let isMounted = true;
    isMounted === true && getUserData();
    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [addReplyReq] = useAddReplyMutation();
  const { onClose } = useDisclosure({
    onClose: () => {
      setShowModal(false);
    },
  });
  const [newReply, setNewReply] = useState("");

  const submitReply = async (e: any) => {
    e.preventDefault();
    await addReplyReq({
      variables: {
        text: newReply,
        replyThread: threadId,
        replySpecialist: data?.me?.id!,
      },
    });
    refetch();
    setShowModal(false);
    // setNewReply("");
  };

  let Form: any = (
    <form onSubmit={(e) => submitReply(e)}>
      <Flex alignItems="center" p="0.5rem">
        <FormControl id="reply" isRequired my="5px">
          <Input
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
          />
        </FormControl>
        <Button
          borderRadius="-10px"
          type="submit"
          p="0.2rm"
          marginLeft="0.2rem"
        >
          {" "}
          submit{" "}
        </Button>
      </Flex>
    </form>
  );

  return (
    <Modal isOpen={showModal} onClose={onClose}>
      <ModalOverlay />
      <ModalContent marginTop="14rem">
        {/* <ModalCloseButton /> */}
        <ModalBody marginTop="1.5rem">{Form}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
