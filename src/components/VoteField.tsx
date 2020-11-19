import React, { useState } from "react";
import { Flex, IconButton, Text } from "@chakra-ui/core";
import {
    MovieInfoFragment,
    useVoteMutation,
    VoteMutation,
} from "../generated/graphql";
import gql from "graphql-tag";
import { ApolloCache } from "@apollo/client";

interface VoteFieldProps {
    movie: MovieInfoFragment;
}

const updateAfterVote = (
    value: number,
    movieId: number,
    cache: ApolloCache<VoteMutation>
) => {
    const data = cache.readFragment<{
        id: number;
        points: number;
        voteStatus: number | null;
        userVotes: number | null;
    }>({
        id: "Movie:" + movieId,
        fragment: gql`
            fragment _ on Movie {
                id
                points
                voteStatus
                userVotes
            }
        `,
    });

    if (data) {
        if (data.voteStatus === value) {
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

export const VoteField: React.FC<VoteFieldProps> = ({ movie }) => {
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
                        if (movie.voteStatus === 1) {
                            return;
                        }
                        setLoadingState("upVote-loading");
                        await vote({
                            variables: {
                                movieId: movie.id,
                                value: 1,
                            },
                            update: (cache) =>
                                updateAfterVote(1, movie.id, cache),
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
                    Total votes: {movie.userVotes}
                </Text>
            </Flex>
        </Flex>
    );
};
