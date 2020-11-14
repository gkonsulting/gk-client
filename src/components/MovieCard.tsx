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
    useDeleteMovieMutation,
    useMeQuery,
} from "../generated/graphql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { VoteField } from "./VoteField";
// interface MovieCardProps {
//     id: number;
//     title: string;
//     description: string;
//     poster: string;
//     rating: string;
//     reason: string;
//     creator: { id: number; username: string };
// }

interface MovieCardProps {
    movie: MovieInfoFragment;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const [deleteMovie] = useDeleteMovieMutation();
    const { data } = useMeQuery();
    const router = useRouter();
    console.log(movie);

    return (
        <Box
            w="sm"
            h={650}
            borderWidth="1px"
            rounded="lg"
            overflow="hidden"
            m={5}
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
                                    <Text fontWeight="bold" fontSize="3xl">
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
                                w={10}
                            />
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Box>
    );
};
