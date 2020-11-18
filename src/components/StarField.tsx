import { ApolloCache, gql } from "@apollo/client";
import { Flex, Icon, IconButton, Text } from "@chakra-ui/core";
import React from "react";
import {
    MovieInfoFragment,
    SetStarsMutation,
    useSetStarsMutation,
} from "../generated/graphql";

interface StarFieldProps {
    movie: MovieInfoFragment;
}

export const StarField: React.FC<StarFieldProps> = ({ movie }) => {
    // const { data: meData } = useMeQuery();

    // const { data, loading } = useGetStarQuery({
    //     variables: { movieId: movie.id, userId: meData!.me!.id },
    // });

    const [rate] = useSetStarsMutation();

    return (
        <Flex mt={2} direction="column">
            {console.log(movie)}

            <Flex direction="column">
                <Flex>
                    <Text fontWeight="bold" fontSize="md">
                        Movie DB-rating:
                    </Text>
                </Flex>
                <Flex my={2} align="center">
                    {Array(10)
                        .fill("")
                        .map((_, i) => (
                            <Icon
                                name="star"
                                key={i}
                                color={
                                    i < parseInt(movie!.rating)
                                        ? "teal.500"
                                        : "gray.300"
                                }
                            />
                        ))}
                    <Text ml={2} color="teal.500" fontWeight="bold">
                        {movie?.rating + "/10"}
                    </Text>
                </Flex>
            </Flex>
            {movie.seen ? (
                <Flex>
                    {Array(10)
                        .fill("")
                        .map((_, i) => (
                            <IconButton
                                icon="star"
                                variant="outline"
                                size="sm"
                                aria-label="Give movie stars"
                                key={i}
                                variantColor={
                                    movie.starStatus !== null &&
                                    i + 1 <= movie!.starStatus!
                                        ? "teal"
                                        : "gray"
                                }
                                onClick={async () => {
                                    if (movie.starStatus === 1) {
                                        return;
                                    }
                                    await rate({
                                        variables: {
                                            movieId: movie.id,
                                            value: i + 1,
                                        },
                                        update: (cache) =>
                                            updateAfterStar(
                                                i + 1,
                                                movie.id,
                                                cache
                                            ),
                                    });
                                }}
                            />
                        ))}
                </Flex>
            ) : null}
            {movie.seen ? (
                <Flex my={2}>
                    <Text fontWeight="bold" fontSize="md">
                        The Bois' rating:
                    </Text>
                    <Text
                        ml={2}
                        fontWeight="bold"
                        fontSize="md"
                        color="teal.500"
                    >
                        {Math.round(
                            (movie.totalStars /
                                (movie.userStars !== 0
                                    ? movie!.userStars!
                                    : 1)) *
                                10
                        ) /
                            10 +
                            "/10"}
                    </Text>
                </Flex>
            ) : null}
        </Flex>
    );
};

const updateAfterStar = (
    value: number,
    movieId: number,
    cache: ApolloCache<SetStarsMutation>
) => {
    const data = cache.readFragment<{
        id: number;
        totalStars: number;
        starStatus: number | null;
        userStars: number | null;
    }>({
        id: "Movie:" + movieId,
        fragment: gql`
            fragment _ on Movie {
                id
                totalStars
                starStatus
                userStars
            }
        `,
    });

    if (data) {
        if (data.starStatus === value) {
            return;
        }
        const newPoints =
            (data.totalStars as number) +
            value -
            (data.starStatus ? data.starStatus : 0);
        const newUserStars =
            (data.starStatus as number) <= 0
                ? (data.userStars as number) + 1
                : (data.userStars as number);
        cache.writeFragment({
            id: "Movie:" + movieId,
            fragment: gql`
                fragment __ on Movie {
                    totalStars
                    starStatus
                    userStars
                }
            `,
            data: {
                totalStars: newPoints,
                starStatus: value,
                userStars: newUserStars,
            },
        });
    }
};
