import { Wrapper } from "../components/Wrapper";
import { Navbar } from "../components/Navbar";
import {
    useGetMoviesQuery,
    // useGetPopularMoviesQuery,
} from "../generated/graphql";
import { MovieCard } from "../components/MovieCard";
import { Button, Flex, Link, Select, SelectProps, Text } from "@chakra-ui/core";
import React from "react";
import { withApollo } from "../utils/withApollo";
import { userAuth } from "../utils/userAuth";
import Loader from "react-loader-spinner";
import NextLink from "next/link";

const Movies = () => {
    userAuth();
    const { data, loading, variables, fetchMore } = useGetMoviesQuery({
        variables: {
            limit: 3,
            cursor: null,
        },
        notifyOnNetworkStatusChange: true,
    });

    // const { data, loading, variables, fetchMore } = useGetPopularMoviesQuery({
    //     variables: {
    //         limit: 3,
    //         cursor: null,
    //     },
    //     notifyOnNetworkStatusChange: true,
    // });

    if (!loading && !data) {
        return <div>No data</div>;
    }

    console.log(variables);

    return (
        <>
            <Navbar />
            <Wrapper>
                <Flex mb="5" direction="column" align="center" justify="center">
                    <Text textAlign="center" fontSize="6xl">
                        Movies
                    </Text>
                    <Flex>
                        <NextLink href="/Add-movie">
                            <Link _hover={{ textDecoration: "none" }}>
                                <Button variantColor="teal" border="1px">
                                    Add movie
                                </Button>
                            </Link>
                        </NextLink>
                        <Select
                            variant="outline"
                            mx={5}
                            placeholder="Order by:"
                            bg="rgba(255,255,255,0.06)"
                            
                        >
                            <option
                                onClick={() => console.log("hei")}
                                value="option1"
                            >
                                Points descending
                            </option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </Select>
                    </Flex>
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
                                              my={3}
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

export default withApollo({ ssr: false })(Movies);
