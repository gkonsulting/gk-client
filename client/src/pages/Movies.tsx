import { Wrapper } from "../components/Wrapper";
import { Navbar } from "../components/Navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useGetMoviesQuery } from "../generated/graphql";
import { MovieCard } from "../components/MovieCard";
import { Button, Flex, Text } from "@chakra-ui/core";
import React, { useState } from "react";

const Movies = () => {
    const [variables, setVariables] = useState({
        limit: 3,
        cursor: null as null | string,
    });
    const [{ data, fetching }] = useGetMoviesQuery({
        variables,
    });
    if (!fetching && !data) {
        return <div>No data</div>;
    }

    return (
        <>
            <Navbar />
            <Wrapper>
                <Text textAlign="center" fontSize="6xl">
                    Movies
                </Text>
                {!data && fetching ? (
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
                                              <MovieCard
                                                  id={movie.id}
                                                  title={movie.title}
                                                  poster={movie.poster}
                                                  description={
                                                      movie.description
                                                  }
                                                  rating={movie.rating}
                                                  reason={movie.reason}
                                                  creator={movie.creator}
                                              />
                                          </Flex>
                                      )
                                  )}
                        </Flex>
                        {data && data.getMovies.hasMore ? (
                            <Flex justifyContent="center">
                                <Button
                                    variantColor="teal"
                                    isLoading={fetching}
                                    onClick={() => {
                                        setVariables({
                                            limit: variables.limit,
                                            cursor:
                                                data?.getMovies.movies[
                                                    data.getMovies.movies
                                                        .length - 1
                                                ].createdAt,
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

export default withUrqlClient(createUrqlClient, { ssr: true })(Movies);
