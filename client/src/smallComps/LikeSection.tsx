/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { BiLike } from "react-icons/bi";
import {
  ListUserLikedRepliesQuery,
  useIsUserLoggedInLazyQuery,
  useUpvoteReplyMutation,
} from "../generated/graphql";
import { ApolloQueryResult } from "@apollo/client";

interface LikeSectionProps {
  refetch: () => any;
  replyId: number;
  upvotes: number;
  likedRepliesIds: number[];
  refetchLikedReplies?: () => Promise<
    ApolloQueryResult<ListUserLikedRepliesQuery>
  >;
}
export const LikeSection: React.FC<LikeSectionProps> = ({
  refetch,
  replyId,
  upvotes,
  likedRepliesIds,
  refetchLikedReplies
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

  const [upvoteReq] = useUpvoteReplyMutation();
  const upvoteReply = async (id: any) => {
    if (data?.isUserLoggedIn === true) {
      await upvoteReq({
        variables: { id },
      });
      await refetch();
      refetchLikedReplies && refetchLikedReplies()
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
        bg={
          likedRepliesIds && likedRepliesIds.includes(replyId)
            ? "blue.200"
            : "green.50"
        }
        cursor={
          likedRepliesIds && likedRepliesIds.includes(replyId)
            ? "not-allowed"
            : "pointer"
        }
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
