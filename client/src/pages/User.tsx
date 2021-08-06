import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useListOtherUserThreadsLazyQuery } from "../generated/graphql";
import { QuestionBox } from "../smallComps/QuestionBox";
import { FastBigSpinner } from "../smallComps/Spinners";

interface UserProps {}

export const User: React.FC<UserProps> = ({}) => {
  const params: { username: string } = useParams();
  const [listOtherThreads, { loading, data }] =
    useListOtherUserThreadsLazyQuery({
      fetchPolicy: "cache-and-network",
      variables: {
        username: params.username,
      },
    });

  useEffect(() => {
    let isMounted = true;
    isMounted && listOtherThreads();
    return () => {
      isMounted = false;
    };
  }, []);

  let ThreadSection: any = null;
  if (loading) {
    ThreadSection = <FastBigSpinner />;
  } else if (data) {
    ThreadSection = (
      <>
        {data.listOtherUserThreads?.map((thread, idx) => {
          return (
            <QuestionBox
              key={idx}
              threadId={thread.id}
              question={thread.question}
              createdAt={thread.createdAt}
              specializtion={thread.specialization}
              fromUserPage={true}
            />
          );
        })}
      </>
    );
  }

  return (
    <Flex
      marginTop="2rem"
      marginX="2rem"
      p="3rem"
      boxShadow="lg"
      direction="column"
      justify="center"
      alignItems="center"
    >
      {ThreadSection}
    </Flex>
  );
};
