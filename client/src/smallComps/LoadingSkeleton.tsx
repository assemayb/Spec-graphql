import { Flex, Skeleton } from "@chakra-ui/react";

type SkeletonProps = {
  num: number;
};
export const LoadingSkeleton = ({ num }: SkeletonProps) => (
  <Flex direction="column" width="100%">
    {Array.from({ length: num }, (val, key) => {
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
