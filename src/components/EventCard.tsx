import { Box, Image, Flex, Text, Stack, Link } from "@chakra-ui/core";
import React from "react";
import { EventInfoFragment } from "../generated/graphql";
import NextLink from "next/link";
import Countdown from "react-countdown";
// import { EventOptionsField } from "./EventOptionsField";
import Maps from "./Maps";
// import { ResponseField } from "./ResponseField";
interface EventCardProps {
    event: EventInfoFragment;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
    // const { data } = useMeQuery();
    const today = new Date();
    const date1 = Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        today.getHours(),
        today.getMinutes()
    );
    const eventDate = new Date(event.date);
    const date2 = Date.UTC(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate(),
        eventDate.getHours(),
        eventDate.getMinutes()
    );
    const diffTime = Math.abs(date2 - date1);

    const Completionist = () => <Text>The event is rolling</Text>;
    return (
        <Box w="sm" h={900} borderWidth="1px" rounded="lg" overflow="hidden">
            <Flex direction="column" justify="space-between">
                <Box>
                    <NextLink href="/Event/[id]" as={`/Event/${event?.id}`}>
                        <Link _hover={{ textDecoration: "none" }}>
                            <Flex w="100%" direction="column">
                                <Image height={200} src={event?.thumbnail} />
                            </Flex>
                            <Box mx="6" mt="5">
                                <Stack spacing={4}>
                                    <Text fontWeight="bold" fontSize="2xl">
                                        {event!.title!.length > 30
                                            ? event!.title!.slice(0, 30)
                                            : event!.title}
                                    </Text>
                                    <Box d="flex" alignItems="baseline">
                                        <Text fontWeight="bold" fontSize="5xl">
                                            <Countdown
                                                date={Date.now() + diffTime}
                                            >
                                                <Completionist />
                                            </Countdown>
                                        </Text>
                                    </Box>
                                    <Box d="flex" alignItems="baseline">
                                        <Text fontWeight="bold" fontSize="2xl">
                                            {event.address}
                                        </Text>
                                    </Box>
                                    <Box
                                        fontWeight="semibold"
                                        as="h4"
                                        lineHeight="tight"
                                        isTruncated
                                    >
                                        <Text>
                                            Made by:{" "}
                                            {event?.creator.username.toUpperCase()}
                                        </Text>
                                    </Box>

                                    <Box h={75}>
                                        {event?.description.length > 115
                                            ? event?.description.slice(0, 115) +
                                              "..."
                                            : event?.description}
                                    </Box>
                                    <Box lineHeight="tight">
                                        <Text fontWeight="bold" fontSize="md">
                                            Date and time:
                                        </Text>
                                        <Text fontSize="md">
                                            {event?.date.substring(0, 10)}{" "}
                                            {event?.date.substring(11, 16)}
                                        </Text>
                                    </Box>
                                </Stack>
                            </Box>
                        </Link>
                    </NextLink>
                    {/* <Flex justify="space-between" mt={2}>
                        <ResponseField event={event} />
                        {data?.me?.id !== event?.creator.id ? null : (
                            <EventOptionsField event={event} />
                        )}
                    </Flex> */}
                    <Maps address={event.address} />
                </Box>
            </Flex>
        </Box>
    );
};
