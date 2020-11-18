import React, { useState } from "react";
import { Box, Badge, Flex, Icon, Stack, Text } from "@chakra-ui/core";
import { useGetMovieFromUrl } from "../../utils/useGetMovieFromUrl";
import { Navbar } from "../../components/Navbar";
import { Wrapper } from "../../components/Wrapper";
import { userAuth } from "../../utils/userAuth";
import { useMeQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import { VoteField } from "../../components/VoteField";
import Loader from "react-loader-spinner";
import { MovieOptionsField } from "../../components/MovieOptionsField";
import { StarField } from "../../components/StarField";

const Movie = ({}) => {
    const { data, error, loading } = useGetMovieFromUrl();
    const [trailerUrl, setTrailerUrl] = useState<String>("");
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
            <Flex justify="center">
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />
            </Flex>
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
                        borderWidth="1px"
                        rounded="lg"
                        overflow="hidden"
                        m={5}
                        opacity={data.getMovie.seen ? 0.2 : 1}
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
                                    <Text
                                        textDecoration={
                                            data.getMovie.seen
                                                ? "line-through"
                                                : "none"
                                        }
                                        fontWeight="bold"
                                        fontSize="3xl"
                                    >
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

                                <Box>{data.getMovie.description}</Box>

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
                                              data.getMovie.reason +
                                              `"`}
                                    </Text>
                                </Box>
                                <StarField movie={data.getMovie} />
                            </Stack>
                        </Box>
                        <Flex justify="space-between" mb={5}>
                            <VoteField movie={data.getMovie} />
                            {meData?.me?.id !==
                            data.getMovie?.creator.id ? null : (
                                <MovieOptionsField movie={data.getMovie} />
                            )}
                        </Flex>
                    </Box>
                </Flex>
            </Wrapper>
        </>
    );
};

export default withApollo({ ssr: false })(Movie);
