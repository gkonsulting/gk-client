import { Wrapper } from "../components/Wrapper";
import { Navbar } from "../components/Navbar";
import { useGetMoviesQuery } from "../generated/graphql";
import { MovieCard } from "../components/MovieCard";
import { Button, Flex, Text } from "@chakra-ui/core";
import React from "react";
import { withApollo } from "../utils/withApollo";
import { userAuth } from "../utils/userAuth";

const Movies = () => {
    userAuth();
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
                <Text textAlign="center" fontSize="6xl">
                    Movies
                </Text>
                {!data && loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <Flex direction="row" wrap="wrap" justify="center">
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
