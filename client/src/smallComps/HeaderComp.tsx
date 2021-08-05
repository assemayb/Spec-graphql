import { Box, Divider } from '@chakra-ui/react';
import React from 'react'

interface HeaderCompProps {
    header: string
}

export const HeaderComp: React.FC<HeaderCompProps> = ({ header }) => {
    return (
        <Box
            marginLeft={{
                base: "6px",
                md: "1rem"
            }}
            marginTop={["8px", "8px", "1rem", "1rem"]}
            fontSize={["15px", "20px", "30px", "30px"]}
            fontFamily="fantasy"
            fontWeight="bold"
            color="gray.500"
            textShadow="lg"
            maxWidth={["150px", "200px", "500px", "500px"]}
        >
            {header}
            <Divider />
        </Box>
    );
}