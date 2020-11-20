import { Box, Badge, Image, Flex, Text, Stack, Link } from "@chakra-ui/core";
import React from "react";
import { MovieInfoFragment, useMeQuery } from "../generated/graphql";
import NextLink from "next/link";
import { VoteField } from "./VoteField";
import { MovieOptionsField } from "./MovieOptionsField";
import { StarField } from "./StarField";

interface MovieCardProps {
    movie: MovieInfoFragment;
    sortedSeen?: number;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, sortedSeen }) => {
    const { data } = useMeQuery();

    return (
        <Box w="sm" h={720} borderWidth="1px" rounded="lg" overflow="hidden">
            <Flex direction="column" justify="space-between">
                <Box opacity={movie.seen && sortedSeen !== 3 ? 0.2 : 1}>
                    <NextLink href="/Movie/[id]" as={`/Movie/${movie?.id}`}>
                        <Link _hover={{ textDecoration: "none" }}>
                            <Flex h={230} w="100%" direction="column">
                                <Image src={movie?.poster} />
                            </Flex>
                            <Box mx="6">
                                <Stack spacing={4}>
                                    <Box lineHeight="tight">
                                        <Text
                                            textDecoration={
                                                movie.seen
                                                    ? "line-through"
                                                    : "none"
                                            }
                                            fontWeight="bold"
                                            fontSize="2xl"
                                        >
                                            {movie?.title.length > 30
                                                ? movie.title.slice(0, 30)
                                                : movie.title}
                                        </Text>
                                        <Text
                                            fontWeight="semibold"
                                            letterSpacing="wide"
                                            fontSize="xs"
                                            color="gray.500"
                                        >
                                            {movie.releasedAt}
                                        </Text>
                                    </Box>

                                    <Box d="flex" alignItems="baseline">
                                        <Badge
                                            ml={-1}
                                            rounded="full"
                                            px="3"
                                            variantColor="teal"
                                        >
                                            Genre
                                        </Badge>
                                    </Box>
                                    <Box
                                        fontWeight="semibold"
                                        as="h4"
                                        lineHeight="tight"
                                        isTruncated
                                    >
                                        <Text>
                                            Suggested by:{" "}
                                            {movie?.creator.username.toUpperCase()}
                                        </Text>
                                    </Box>

                                    <Box h={75}>
                                        {movie?.description.length > 115
                                            ? movie?.description.slice(0, 115) +
                                              "..."
                                            : movie?.description}
                                    </Box>
                                    <Box lineHeight="tight">
                                        <Text fontWeight="bold" fontSize="md">
                                            Why should we watch this movie?
                                        </Text>
                                        <Text fontSize="md">
                                            {movie?.reason.length < 35
                                                ? movie?.creator.username.toUpperCase() +
                                                  `: "` +
                                                  movie?.reason +
                                                  `"`
                                                : movie?.creator.username.toUpperCase() +
                                                  `: "` +
                                                  movie?.reason.slice(0, 35) +
                                                  `..."`}
                                        </Text>
                                    </Box>
                                </Stack>
                            </Box>
                        </Link>
                    </NextLink>
                </Box>
                <Flex mx={6}>
                    <StarField movie={movie} />
                </Flex>
                <Flex justify="space-between" mt={2}>
                    <VoteField movie={movie} />
                    {data?.me?.id !== movie?.creator.id ? null : (
                        <MovieOptionsField movie={movie} />
                    )}
                </Flex>
            </Flex>
        </Box>
    );
};
