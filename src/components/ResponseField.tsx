import React, { useState } from "react";
import { Flex, IconButton, Text } from "@chakra-ui/core";
import {
    EventInfoFragment,
    useVoteMutation,
    VoteMutation,
} from "../generated/graphql";
import gql from "graphql-tag";
import { ApolloCache } from "@apollo/client";

interface ResponseFieldProps {
    event: EventInfoFragment;
}

const updateAfterVote = (
    value: number,
    eventId: number,
    cache: ApolloCache<VoteMutation>
) => {
    const data = cache.readFragment<{
        id: number;
        responseStatus: number | null;
    }>({
        id: "Event:" + eventId,
        fragment: gql`
            fragment _ on Event {
                id
                responseStatus
            }
        `,
    });

    if (data) {
        if (data.responseStatus === value) {
            return;
        }
        const newPoints =
            (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
        const newUserVotes = !data.voteStatus
            ? (data.userVotes as number) + 1
            : (data.userVotes as number);

        cache.writeFragment({
            id: "Movie:" + movieId,
            fragment: gql`
                fragment __ on Movie {
                    points
                    voteStatus
                    userVotes
                }
            `,
            data: {
                points: newPoints,
                voteStatus: value,
                userVotes: newUserVotes,
            },
        });
    }
};

export const VoteField: React.FC<ResponseFieldProps> = ({ event }) => {
    const [loadingState, setLoadingState] = useState<
        "upVote-loading" | "downVote-loading" | "not-loading"
    >("not-loading");
    const [vote] = useVoteMutation();
    return (
        <Flex direction="column" pl={6}>
            <Flex justifyContent="center" alignItems="center">
                <IconButton
                    mr={3}
                    onClick={async () => {
                        if (event.voteStatus === 1) {
                            return;
                        }
                        setLoadingState("upVote-loading");
                        await vote({
                            variables: {
                                eventId: event.id,
                                value: 1,
                            },
                            update: (cache) =>
                                updateAfterVote(1, event.id, cache),
                        });
                        setLoadingState("not-loading");
                    }}
                    variantColor={movie.voteStatus === 1 ? "green" : undefined}
                    isLoading={loadingState === "upVote-loading"}
                    aria-label="upVote movie"
                    icon="triangle-up"
                    size="sm"
                />
                {movie.points}
                <IconButton
                    ml={3}
                    onClick={async () => {
                        if (movie.voteStatus === -1) {
                            return;
                        }
                        setLoadingState("downVote-loading");
                        await vote({
                            variables: {
                                movieId: movie.id,
                                value: -1,
                            },
                            update: (cache) =>
                                updateAfterVote(-1, movie.id, cache),
                        });
                        setLoadingState("not-loading");
                    }}
                    variantColor={movie.voteStatus === -1 ? "red" : undefined}
                    isLoading={loadingState === "downVote-loading"}
                    aria-label="downVote movie"
                    icon="triangle-down"
                    size="sm"
                />
            </Flex>
            <Flex mt="2">
                <Text fontWeight="bold" fontSize="md">
                    Total votes: {event.userVotes}
                </Text>
            </Flex>
        </Flex>
    );
};
