import { Flex, Skeleton } from "@chakra-ui/react";

export const LoadingSkeleton = () => (
    <Flex direction="column" width="100%">
      {Array.from({ length: 4 }, (val, key) => {
        return (
          <Skeleton
            key={key}
            pos="relative"
            p="0.5rem"
            my="5px"
            height={{
              base: "100px",
              md: "150px",
            }}
            width="100%"
            color="green.100"
          />
        );
      })}
    </Flex>
  );
  