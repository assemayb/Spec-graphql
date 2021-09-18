/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { BiLike } from "react-icons/bi";
import {
  useIsUserLoggedInLazyQuery,
  useUpvoteReplyMutation,
} from "../generated/graphql";

interface LikeSectionProps {
  refetch: () => any;
  replyId: number;
  upvotes: number;
  likedRepliesIds: number[];
}
export const LikeSection: React.FC<LikeSectionProps> = ({
  refetch,
  replyId,
  upvotes,
  likedRepliesIds,
}) => {
  const [isUserLoggedInLazyQuery, { data }] = useIsUserLoggedInLazyQuery({
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      isUserLoggedInLazyQuery();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    console.log(likedRepliesIds);
  }, [likedRepliesIds]);

  const [upvoteReq] = useUpvoteReplyMutation();
  const upvoteReply = async (id: any) => {
    if (data?.isUserLoggedIn === true) {
      await upvoteReq({
        variables: { id },
      });
      await refetch();
    } else {
      const profileBtn: HTMLElement = document.getElementById("profile-btn")!;
      profileBtn.click();
    }
  };

  return (
    <Box display="flex">
      <Box
        as="button"
        onClick={() => upvoteReply(replyId)}
        borderRadius="-20px"
        p={{ base: "5px", md: "10px" }}
        disabled={likedRepliesIds && likedRepliesIds.includes(replyId)}
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
        p={{ base: "5px", md: "10px" }}
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
