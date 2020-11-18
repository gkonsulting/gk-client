import {
    Box,
    Badge,
    Icon,
    Image,
    Flex,
    Text,
    Stack,
    Link,
} from "@chakra-ui/core";
import React from "react";
import { MovieInfoFragment, useMeQuery } from "../generated/graphql";
import NextLink from "next/link";
import { VoteField } from "./VoteField";
import { MovieOptionsField } from "./MovieOptionsField";

interface MovieCardProps {
    movie: MovieInfoFragment;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const { data } = useMeQuery();

    return (
        <Box
            opacity={movie.seen ? 0.2 : 1}
            w="sm"
            h={650}
            borderWidth="1px"
            rounded="lg"
            overflow="hidden"
        >
            <Flex direction="column" justify="space-between">
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
                                            movie.seen ? "line-through" : "none"
                                        }
                                        fontWeight="bold"
                                        fontSize="2xl"
                                    >
                                        {movie?.title.length > 30
                                            ? movie.title.slice(0, 30)
                                            : movie.title}
                                    </Text>
                                </Box>
                                <Box d="flex" alignItems="baseline">
                                    <Badge
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

                                <Box d="flex" alignItems="center">
                                    {Array(10)
                                        .fill("")
                                        .map((_, i) => (
                                            <Icon
                                                name="star"
                                                key={i}
                                                color={
                                                    i < parseInt(movie?.rating)
                                                        ? "teal.500"
                                                        : "gray.300"
                                                }
                                            />
                                        ))}
                                    <Text
                                        ml={2}
                                        color="teal.500"
                                        fontWeight="bold"
                                    >
                                        {" "}
                                        {" " + movie?.rating + "/10"}
                                    </Text>
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
                <Flex justify="space-between" mt={4}>
                    <VoteField movie={movie} />
                    {data?.me?.id !== movie?.creator.id ? null : (
                        <MovieOptionsField movie={movie} />
                    )}
                </Flex>
            </Flex>
        </Box>
    );
};
