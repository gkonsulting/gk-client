import { Wrapper } from "../components/Wrapper";
import { Navbar } from "../components/Navbar";
import { useGetMoviesQuery } from "../generated/graphql";
import { MovieCard } from "../components/MovieCard";
import { Button, Flex, Link, Text } from "@chakra-ui/core";
import React from "react";
import { withApollo } from "../utils/withApollo";
import { userAuth } from "../utils/userAuth";
import Loader from "react-loader-spinner";
import NextLink from "next/link";

const Movies = () => {
    // userAuth();
    const { data, loading, variables, fetchMore } = useGetMoviesQuery({
        variables: {
            limit: 3,
            cursor: null,
        },
        notifyOnNetworkStatusChange: true,
    });

    if (!loading && !data) {
        return <div>No data</div>;
    }

    return (
        <>
            <Navbar />
            <Wrapper>
                <Flex mb="5" direction="column" align="center" justify="center">
                    <Text textAlign="center" fontSize="6xl">
                        Movies
                    </Text>
                    <NextLink href="/Add-movie">
                        <Link _hover={{ textDecoration: "none" }}>
                            <Button variantColor="teal" border="1px">
                                Add movie
                            </Button>
                        </Link>
                    </NextLink>
                </Flex>
                {!data && loading ? (
                    <Flex justify="center" align="center">
                        <Loader
                            type="Puff"
                            color="#00BFFF"
                            height={100}
                            width={100}
                            timeout={3000} //3 secs
                        />
                    </Flex>
                ) : (
                    <>
                        <Flex
                            direction="row"
                            wrap="wrap"
                            justify="space-evenly"
                        >
                            {!data
                                ? null
                                : data.getMovies.movies.map((movie, i) =>
                                      !movie ? null : (
                                          <Flex
                                              direction="column"
                                              align="center"
                                              key={i}
                                          >
                                              <MovieCard movie={movie} />
                                          </Flex>
                                      )
                                  )}
                        </Flex>
                        {data && data.getMovies.hasMore ? (
                            <Flex justifyContent="center">
                                <Button
                                    variantColor="teal"
                                    isLoading={loading}
                                    onClick={() => {
                                        fetchMore({
                                            variables: {
                                                limit: variables?.limit,
                                                cursor:
                                                    data?.getMovies.movies[
                                                        data.getMovies.movies
                                                            .length - 1
                                                    ].createdAt,
                                            },
                                        });
                                    }}
                                    m={5}
                                >
                                    Show more
                                </Button>
                            </Flex>
                        ) : null}
                    </>
                )}
            </Wrapper>
        </>
    );
};

export default withApollo({ ssr: true })(Movies);
