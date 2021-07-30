import { Box, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import {
  useIsUserLoggedInLazyQuery,
  useIsUserLoggedInQuery,
  useUpvoteReplyMutation,
} from "../generated/graphql";
import { ModalComponent } from "../components/Modal";

interface LikeSectionProps {
  refetch: () => any;
  replyId: number;
  upvotes: number;
}
export const LikeSection: React.FC<LikeSectionProps> = ({
  refetch,
  replyId,
  upvotes,
}) => {
  const [isUserLoggedInLazyQuery, {data}] = useIsUserLoggedInLazyQuery({ fetchPolicy: "network-only" });
  const [showUserLoginModal, setShowUserLoginModal] = useState(false);
  const { onClose } = useDisclosure({
    onClose: () => {
      setShowUserLoginModal(false);
    },
  });
  const [upvoteReq] = useUpvoteReplyMutation();
  const upvoteReply = async (id: any) => {
    if (data?.isUserLoggedIn === true) {
      await upvoteReq({
        variables: { id },
      });
      await refetch();
    } else {
      setShowUserLoginModal(true);
    }
  };

  return (
    <Box display="flex" left="1x" bottom="1px">
      <ModalComponent showModal={showUserLoginModal} onClose={onClose} />
      <Box
        as="button"
        // disabled={data?.isUserLoggedIn === false}
        onClick={() => upvoteReply(replyId)}
        borderRadius="-20px"
        p="10px"
        bg="green.50"
        _hover={{
          bg: "blue.300",
          color: "white",
        }}
        boxShadow="md"
        marginRight="3px"
      >
        <BiLike size="20px" />
      </Box>
      <Box
        _hover={{
          bg: "blue.300",
          color: "white",
        }}
        p="10px"
        bg="green.100"
        boxShadow="md"
        mx="3px"
        borderRadius="-20px"
      >
        {upvotes} likes
      </Box>
    </Box>
  );
};
