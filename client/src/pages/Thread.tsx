/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import {
  GetThreadDataQuery,
  useAddReplyMutation,
  useGetThreadDataQuery,
  useMeLazyQuery,
} from "../generated/graphql";
import { LikeSection } from "../smallComps/LikeSection";
import { SortingButtonsSection } from "../smallComps/ThreadSortingBtns";
import { ApolloQueryResult } from "@apollo/client";

interface HeaderSectionProps {
  question: string;
}
export const HeaderSection: React.FC<HeaderSectionProps> = ({ question }) => {
  return (
    <Heading
      p="1rem"
      textShadow="lg"
      color="#718096"
      textTransform="uppercase"
      fontSize="25px"
    >
      {question}
      <Divider marginTop="1rem" />
    </Heading>
  );
};

interface AddReplyModalProps {
  showModal: boolean;
  setShowModal: any;
  threadId: number;
  refetch: () => any
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
      <ModalContent marginTop="8rem">
        <ModalCloseButton />
        <ModalBody marginTop="1.5rem">{Form}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
interface ThreadProps {}
export const Thread: React.FC<ThreadProps> = () => {
  const params: {
    threadId: string;
  } = useParams();
  const { data, refetch } = useGetThreadDataQuery({
    fetchPolicy: "network-only",
    variables: {
      id: parseInt(params.threadId!),
      sortBy: "recent",
    },
  });
  const fetchByUpvotes = () =>
    refetch({
      id: parseInt(params.threadId!),
      sortBy: "upvotes",
    });

  const refetchByDate = () => {
    refetch({
      id: parseInt(params.threadId!),
      sortBy: "recent",
    });
  };
  const [repliesCount, setRepliesCount] = useState(0);
  const [showReplies, setShowReplies] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setRepliesCount(data?.getThread?.replies?.length!);
  }, [data?.getThread, params]);
  useEffect(() => {
    if (repliesCount > 0) {
      setTimeout(() => {
        setShowReplies(true);
      }, 200);
    }
  }, [repliesCount]);

  return (
    <Flex
      mx="auto"
      marginTop="2rem"
      p={{ base: "0.6rem", md: "1rem" }}
      boxShadow="md"
      flexDir="column"
    >
      <AddReplyModal
        setShowModal={setShowModal}
        showModal={showModal}
        threadId={parseInt(params.threadId!)}
        refetch={refetchByDate}
      />
      <Flex align="center" justify="space-between" p="1.5rem">
        <HeaderSection question={data?.getThread?.question!} />
        <Button
          onClick={() => setShowModal(true)}
          bg="blue.300"
          opacity="0.75"
          borderRadius="-10px"
          _hover={{
            opacity: "0.9",
          }}
          p="1.5rem"
        >
          {" "}
          add reply
        </Button>
      </Flex>
      <Box>
        {showReplies === false ? (
          Array(repliesCount)
            .fill("-")
            .map((item, idx) => (
              <Skeleton key={idx} p="1rem" height="50px" my="0.6rem" />
            ))
        ) : (
          <>
            <SortingButtonsSection
              fetchByUpvotes={fetchByUpvotes}
              refetchByDate={refetchByDate}
            />
            {data?.getThread &&
              data?.getThread?.replies?.map((reply, idx) => {
                return (
                  <Heading
                    key={idx}
                    as="h4"
                    p="1.2em"
                    textShadow="md"
                    color="#718096"
                    fontSize="15px"
                    borderLeft="4px solid gray"
                    marginTop="8px"
                    bgColor="gray.50"
                    _hover={{
                      bgColor: "gray.100",
                      textShadow: "lg",
                    }}
                    marginLeft="0.5rem"
                    pos="relative"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {reply.text}
                    <LikeSection
                      refetch={refetchByDate}
                      replyId={reply.id}
                      upvotes={reply.upvotes}
                    />
                  </Heading>
                );
              })}
          </>
        )}
      </Box>
    </Flex>
  );
};
