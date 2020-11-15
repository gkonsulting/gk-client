import React from "react";
import { Box, Flex, Text } from "@chakra-ui/core";
import { Navbar } from "../components/Navbar";
import { Wrapper } from "../components/Wrapper";
import { withApollo } from "../utils/withApollo";
import ReactPlayer from "react-player";

const Vlog = ({}) => {
    return (
        <>
            <Navbar />
            <Wrapper>
                <Text textAlign="center" fontSize="6xl">
                    Vlog
                </Text>
                <Flex direction="row" wrap="wrap" justify="space-evenly">
                    <Box m={1}>
                        <ReactPlayer
                            width="100vw"
                            controls={true}
                            url="https://www.dailymotion.com/video/x7na563"
                        />
                    </Box>
                    <Box m={1}>
                        <ReactPlayer
                            width="100vw"
                            controls={true}
                            url="https://www.dailymotion.com/video/x7na7ux"
                        />
                    </Box>
                </Flex>
            </Wrapper>
        </>
    );
};

export default withApollo({ ssr: true })(Vlog);
