import {
    Box,
    Badge,
    Icon,
    Image,
    Flex,
    Text,
    Stack,
    IconButton,
    Link,
} from "@chakra-ui/core";
import React from "react";
import {
    MovieInfoFragment,
    UpdateSeenMutation,
    useDeleteMovieMutation,
    useMeQuery,
    useUpdateSeenMutation,
} from "../generated/graphql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { VoteField } from "./VoteField";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ApolloCache, gql } from "@apollo/client";

interface MovieCardProps {
    movie: MovieInfoFragment;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const [deleteMovie] = useDeleteMovieMutation();
    const [updateSeen] = useUpdateSeenMutation();
    const { data } = useMeQuery();
    const router = useRouter();

    return (
        <Box w="sm" h={650} borderWidth="1px" rounded="lg" overflow="hidden">
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
                                        fontSize="3xl"
                                    >
                                        {movie?.title}
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
                        <Flex pr={6}>
                            <NextLink
                                href="/Movie/Update/[id]"
                                as={`/Movie/Update/${movie?.id}`}
                            >
                                <Link>
                                    <IconButton
                                        icon="edit"
                                        size="sm"
                                        variantColor="teal"
                                        aria-label="Update Movie"
                                        w={10}
                                        mr={3}
                                    />
                                </Link>
                            </NextLink>
                            <IconButton
                                icon="delete"
                                size="sm"
                                variantColor="teal"
                                aria-label="Delete Movie"
                                mr={3}
                                w={10}
                                onClick={async () =>
                                    await deleteMovie({
                                        variables: {
                                            id: movie?.id,
                                        },
                                        update: (cache) => {
                                            cache.evict({
                                                id: "Movie:" + movie?.id,
                                            });
                                        },
                                    }).then(() => {
                                        router.push("/Movies");
                                    })
                                }
                            />
                            {!movie.seen ? (
                                <IconButton
                                    variantColor="teal"
                                    size="sm"
                                    icon={FaEye}
                                    aria-label="Have watched"
                                    w={10}
                                    onClick={async () => {
                                        await updateSeen({
                                            variables: {
                                                id: movie!.id,
                                                seen: true,
                                            },
                                            update: (cache) =>
                                                updateAfterSeen(
                                                    true,
                                                    movie.id,
                                                    cache
                                                ),
                                        });
                                    }}
                                />
                            ) : (
                                <IconButton
                                    variantColor="teal"
                                    size="sm"
                                    icon={FaEyeSlash}
                                    aria-label="Have not watched"
                                    w={10}
                                    onClick={async () => {
                                        await updateSeen({
                                            variables: {
                                                id: movie!.id,
                                                seen: false,
                                            },
                                            update: (cache) =>
                                                updateAfterSeen(
                                                    false,
                                                    movie.id,
                                                    cache
                                                ),
                                        });
                                    }}
                                />
                            )}
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Box>
    );
};

const updateAfterSeen = (
    value: boolean,
    movieId: number,
    cache: ApolloCache<UpdateSeenMutation>
) => {
    const data = cache.readFragment<{
        id: number;
        seen: boolean;
    }>({
        id: "Movie:" + movieId,
        fragment: gql`
            fragment _ on Movie {
                id
                seen
            }
        `,
    });

    if (data) {
        if (data.seen === value) {
            return;
        }
        const newValue = value;
        cache.writeFragment({
            id: "Movie:" + movieId,
            fragment: gql`
                fragment __ on Movie {
                    seen
                }
            `,
            data: { seen: newValue },
        });
    }
};
