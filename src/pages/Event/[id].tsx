import React from "react";
import { Box, Flex, Stack, Text, Image } from "@chakra-ui/core";
import { useGetEventFromUrl } from "../../utils/useGetEventFromUrl";
import { Navbar } from "../../components/Navbar";
import { userAuth } from "../../utils/userAuth";
import { useMeQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import { useRouter } from "next/router";
import Loader from "react-loader-spinner";

import { EventOptionsField } from "../../components/EventOptionsField";
import Countdown from "react-countdown";

const Event = ({}) => {
    const { data, error, loading } = useGetEventFromUrl();
    const { data: meData } = useMeQuery();
    const router = useRouter();
    userAuth(router.query.id as string);

    const today = new Date();
    const date1 = Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        today.getHours(),
        today.getMinutes()
    );

    const Completionist = () => <Text>The event is rolling</Text>;

    if (loading) {
        return (
            <Flex
                position="fixed"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
            >
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />
            </Flex>
        );
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    if (!data?.getEvent) {
        return <Box>could not find post</Box>;
    }
    return (
        <>
            <Navbar />
            <Flex direction="row" wrap="wrap" justify="center">
                <Box rounded="lg" overflow="hidden" mb={5}>
                    <Flex w="100%" direction="column">
                        <Image src={data.getEvent.thumbnail} />
                    </Flex>
                    <Box p="6">
                        <Stack spacing={5}>
                            <Box lineHeight="tight">
                                <Text fontWeight="bold" fontSize="3xl">
                                    {data.getEvent.title}
                                </Text>
                                <Text
                                    fontWeight="semibold"
                                    letterSpacing="wide"
                                    fontSize="xs"
                                    color="gray.500"
                                >
                                    {data.getEvent.date.substring(0, 10)}{" "}
                                    {data.getEvent.date.substring(11, 16)}
                                </Text>
                            </Box>
                            <Box d="flex" alignItems="baseline">
                                {}
                                <Text fontWeight="bold" fontSize="5xl">
                                    <Countdown
                                        date={
                                            Date.now() +
                                            Math.abs(
                                                Date.UTC(
                                                    new Date(
                                                        data.getEvent.date
                                                    ).getFullYear(),
                                                    new Date(
                                                        data.getEvent.date
                                                    ).getMonth(),
                                                    new Date(
                                                        data.getEvent.date
                                                    ).getDate(),
                                                    new Date(
                                                        data.getEvent.date
                                                    ).getHours(),
                                                    new Date(
                                                        data.getEvent.date
                                                    ).getMinutes()
                                                ) - date1
                                            )
                                        }
                                    >
                                        <Completionist />
                                    </Countdown>
                                </Text>
                            </Box>
                            <Box
                                fontWeight="semibold"
                                as="h4"
                                lineHeight="tight"
                                isTruncated
                            >
                                <Text>
                                    Suggested by:{" "}
                                    {data.getEvent.creator.username.toUpperCase()}
                                </Text>
                            </Box>
                            <Box>{data.getEvent.description}</Box>
                        </Stack>
                    </Box>
                    <Flex justify="flex-end" mb={5}>
                        {meData?.me?.id !== data.getEvent?.creator.id ? null : (
                            <EventOptionsField event={data.getEvent} />
                        )}
                    </Flex>
                </Box>
            </Flex>
        </>
    );
};

export default withApollo({ ssr: false })(Event);
