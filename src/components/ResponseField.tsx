import React, { useState } from "react";
import { Flex, IconButton, Text } from "@chakra-ui/core";
import {
    EventInfoFragment,
    useResponseMutation,
    ResponseMutation,
    useGetResponsesQuery,
} from "../generated/graphql";
import gql from "graphql-tag";
import { ApolloCache } from "@apollo/client";

interface ResponseFieldProps {
    event: EventInfoFragment;
}

const updateAfterResponse = (
    value: number,
    eventId: number,
    accept: number,
    decline: number,
    cache: ApolloCache<ResponseMutation>
) => {
    const data = cache.readFragment<{
        id: number;
        responseStatus: number | null;
    }>({
        id: "Event:" + eventId,
        fragment: gql`
            fragment _ on Response {
                accept
                decline
            }
        `,
    });

    if (data) {
        if (data.responseStatus === value) {
            return;
        }

        const voted = data.responseStatus === 1 ? true : false;

        let newPointsAccept;
        let newPointsDecline;
        if (voted) {
            newPointsAccept =
                (accept as number) + (!data.responseStatus ? 1 : 2) * value;
        } else {
            newPointsDecline =
                (decline as number) + (!data.responseStatus ? 1 : 2) * value;
        }

        cache.writeFragment({
            id: "Event:" + eventId,
            fragment: gql`
                fragment __ on Response {
                    accept
                    decline
                }
            `,
            data: {
                accept: newPointsAccept,
                decline: newPointsDecline,
            },
        });
    }
};

export const ResponseField: React.FC<ResponseFieldProps> = ({ event }) => {
    const [loadingState, setLoadingState] = useState<
        "upVote-loading" | "downVote-loading" | "not-loading"
    >("not-loading");

    const [response] = useResponseMutation();
    const { data } = useGetResponsesQuery({
        variables: {
            eventId: event.id,
        },
    });
    return (
        <Flex direction="column">
            <Flex ml="6" alignItems="center">
                <IconButton
                    mr={3}
                    onClick={async () => {
                        if (event.responseStatus === 1) {
                            return;
                        }
                        setLoadingState("upVote-loading");
                        await response({
                            variables: {
                                eventId: Number(event.id),
                                value: 1,
                            },
                            update: (cache) =>
                                updateAfterResponse(
                                    1,
                                    event.id,
                                    data!.getResponses.accept,
                                    data!.getResponses.decline,
                                    cache
                                ),
                        });
                        setLoadingState("not-loading");
                    }}
                    variantColor={
                        event.responseStatus === 1 ? "green" : undefined
                    }
                    isLoading={loadingState === "upVote-loading"}
                    aria-label="upVote event"
                    icon="check"
                    size="sm"
                />
                <Text fontWeight="bold" fontSize="md">
                    Guests arriving: {data?.getResponses.accept}
                </Text>
            </Flex>
            <Flex ml="6" alignItems="center" mt="4">
                <IconButton
                    mr={3}
                    onClick={async () => {
                        if (event.responseStatus === -1) {
                            return;
                        }
                        setLoadingState("downVote-loading");
                        await response({
                            variables: {
                                eventId: event.id,
                                value: -1,
                            },
                            update: (cache) =>
                                updateAfterResponse(
                                    -1,
                                    event.id,
                                    data!.getResponses.accept,
                                    data!.getResponses.decline,
                                    cache
                                ),
                        });
                        setLoadingState("not-loading");
                    }}
                    variantColor={
                        event.responseStatus === -1 ? "red" : undefined
                    }
                    isLoading={loadingState === "downVote-loading"}
                    aria-label="downVote event"
                    icon="close"
                    size="sm"
                />
                <Text fontWeight="bold" fontSize="md">
                    Guests not available: {data?.getResponses.decline}
                </Text>
            </Flex>
        </Flex>
    );
};
