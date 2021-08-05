import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Box, Grid, Skeleton } from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";
import { HeaderComp } from "../smallComps/HeaderComp";
import { TopicBox } from "../smallComps/TopicBox";

export const topicsQuery = gql`
  query listTopics {
    listTopics
  }
`;

export const Topics: React.FC<RouteComponentProps> = () => {
  const { data } = useQuery(topicsQuery);
  const [topcis, setTopics] = useState([]);
  const [dummieArr] = useState(new Array(12).fill(""));

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setTopics(data.listTopics);
      }, 200);
    }
  }, [data]);

  return (
    <>
      <HeaderComp header={"Health Topics"} />
      <Box
        
        p={["0.8rem", "0.8rem", "1rem", "1rem"]}
        shadow="base"
        marginTop="1rem"
      >
        <Grid
          templateColumns={[
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
            "repeat(5, 1fr)",
          ]}
          gap={5}
        >
          <>
            {topcis.length < 1
              ? dummieArr.map((item, idx) => {
                  return <Skeleton color="green.100" key={idx} height="80px" />;
                })
              : topcis.map((item, idx) => <TopicBox key={idx} topic={item} />)}
          </>
        </Grid>
      </Box>
    </>
  );
};
