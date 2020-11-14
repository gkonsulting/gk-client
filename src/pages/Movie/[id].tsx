import React, { useState } from "react";
import {
    Box,
    Badge,
    Flex,
    Icon,
    IconButton,
    Stack,
    Text,
    Link,
} from "@chakra-ui/core";
import { useGetMovieFromUrl } from "../../utils/useGetMovieFromUrl";
import { Navbar } from "../../components/Navbar";
import { Wrapper } from "../../components/Wrapper";
import { userAuth } from "../../utils/userAuth";
import { useDeleteMovieMutation, useMeQuery } from "../../generated/graphql";
import NextLink from "next/link";
import { withApollo } from "../../utils/withApollo";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import { VoteField } from "../../components/VoteField";

const Movie = ({}) => {
    const { data, error, loading } = useGetMovieFromUrl();
    const [trailerUrl, setTrailerUrl] = useState<String>("");
    const [deleteMovie] = useDeleteMovieMutation();
    const { data: meData } = useMeQuery();
    const router = useRouter();
    userAuth(router.query.id as string);

    const getTrailer = async (movie: string): Promise<void> => {
        const movieTrailer = require("movie-trailer");
        await movieTrailer(movie).then((res: string): void => {
            setTrailerUrl(res);
        });
    };

    if (loading) {
        return (
            <Box>
                <div>loading...</div>
            </Box>
        );
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    if (!data?.getMovie) {
        return <Box>could not find post</Box>;
    }
    getTrailer(data!.getMovie!.title);
    return (
        <>
            <Navbar />
            <Wrapper>
                <Flex direction="row" wrap="wrap" justify="center">
                    <Box
                        w="6xl"
                        h={1000}
                        borderWidth="1px"
                        rounded="lg"
                        overflow="hidden"
                        m={5}
                    >
                        <Flex
                            align="center"
                            h={380}
                            w="100%"
                            direction="column"
                        >
                            <ReactPlayer
                                width="100%"
                                controls={true}
                                url={trailerUrl as string}
                            />
                        </Flex>

                        <Box p="6">
                            <Stack spacing={5}>
                                <Box lineHeight="tight">
                                    <Text fontWeight="bold" fontSize="3xl">
                                        {data.getMovie.title}
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
                                        {data.getMovie.creator.username.toUpperCase()}
                                    </Text>
                                </Box>

                                <Box h={75}>
                                    {data.getMovie.description.length > 125
                                        ? data.getMovie.description.slice(
                                              0,
                                              125
                                          ) + "..."
                                        : data.getMovie.description}
                                </Box>

                                <Box d="flex" alignItems="center">
                                    {Array(10)
                                        .fill("")
                                        .map((_, i) => (
                                            <Icon
                                                name="star"
                                                key={i}
                                                color={
                                                    i <
                                                    parseInt(
                                                        data!.getMovie!.rating
                                                    )
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
                                        {" " + data.getMovie.rating + "/10"}
                                    </Text>
                                </Box>
                                <Box lineHeight="tight">
                                    <Text fontWeight="bold" fontSize="md">
                                        Why should we watch this movie?
                                    </Text>
                                    <Text fontSize="md">
                                        {data.getMovie.reason.length < 50
                                            ? data.getMovie.creator.username.toUpperCase() +
                                              `: "` +
                                              data.getMovie.reason +
                                              `"`
                                            : data.getMovie.creator.username.toUpperCase() +
                                              `: "` +
                                              data.getMovie.reason.slice(
                                                  0,
                                                  50
                                              ) +
                                              `"`}
                                    </Text>
                                </Box>
                            </Stack>
                        </Box>
                        <Flex justify="space-between">
                            <VoteField movie={data.getMovie} />
                            {meData?.me?.id !==
                            data.getMovie?.creator.id ? null : (
                                <Flex pr={6}>
                                    <NextLink
                                        href="/Movie/Update/[id]"
                                        as={`/Movie/Update/${data.getMovie?.id}`}
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
                                                    id: data.getMovie
                                                        ?.id as number,
                                                },
                                                update: (cache) => {
                                                    cache.evict({
                                                        id:
                                                            "Movie:" +
                                                            data.getMovie?.id,
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
                    </Box>
                </Flex>
            </Wrapper>
        </>
    );
};

export default withApollo({ ssr: true })(Movie);
