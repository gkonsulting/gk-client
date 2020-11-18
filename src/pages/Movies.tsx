import { Wrapper } from "../components/Wrapper";
import { Navbar } from "../components/Navbar";
import {
    MovieInfoFragment,
    useGetMoviesQuery,
    useGetMyMoviesQuery,
    useGetPopularMoviesQuery,
    useMeQuery,
} from "../generated/graphql";
import { MovieCard } from "../components/MovieCard";
import { Button, Flex, Link, Select, Text } from "@chakra-ui/core";
import React from "react";
import { withApollo } from "../utils/withApollo";
import { userAuth } from "../utils/userAuth";
import Loader from "react-loader-spinner";
import NextLink from "next/link";

const Movies = () => {
    userAuth();
    const [myId, setMyId] = React.useState(0);
    const { data: me, loading: meLoading } = useMeQuery();

    React.useEffect(() => {
        if (me) setMyId(me!.me!.id);
    }, [me, meLoading]);

    const [sort, setSort] = React.useState(0);
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(parseInt(event.target.value));
    };

    const { data, loading, variables, fetchMore } = useGetMoviesQuery({
        variables: {
            limit: 3,
            cursor: null,
        },
        notifyOnNetworkStatusChange: true,
    });

    const {
        data: dataPop,
        loading: loadingPop,
        variables: variablesPop,
        fetchMore: fetchMorePop,
    } = useGetPopularMoviesQuery({
        variables: {
            limit: 3,
            cursor: null,
        },
        notifyOnNetworkStatusChange: true,
    });

    const {
        data: dataMy,
        loading: loadingMy,
        variables: variablesMy,
        fetchMore: fetchMoreMy,
    } = useGetMyMoviesQuery({
        variables: {
            limit: 3,
            creatorId: myId,
            cursor: null,
        },
    });

    let selectedSort: any = null;

    if (sort === 0) selectedSort = data?.getMovies;
    else if (sort === 1) selectedSort = dataPop?.getPopularMovies;
    else if (sort === 2) selectedSort = dataMy?.getMyMovies;

    if (
        (!loading && !data) ||
        (!loadingPop && !dataPop) ||
        (!loadingMy && !dataMy)
    ) {
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
                            bg="rgba(255,255,255,0.06)"
                            value={sort}
                            onChange={handleSelect}
                        >
                            <option value={0}>Created DESC</option>
                            <option value={1}>Points DESC</option>
                            <option value={2}>My movies</option>
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
                                : selectedSort?.movies.map(
                                      (movie: MovieInfoFragment, i: number) =>
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
                        {data && selectedSort?.hasMore ? (
                            <Flex justifyContent="center">
                                {sort === 0 ? (
                                    <Button
                                        variantColor="teal"
                                        isLoading={loading}
                                        m={5}
                                        onClick={() => {
                                            fetchMore({
                                                variables: {
                                                    limit: variables?.limit,
                                                    cursor:
                                                        selectedSort.movies[
                                                            selectedSort.movies
                                                                .length - 1
                                                        ].createdAt,
                                                },
                                            });
                                        }}
                                    >
                                        Show more
                                    </Button>
                                ) : null}
                                {sort === 1 ? (
                                    <Button
                                        variantColor="teal"
                                        isLoading={loading}
                                        m={5}
                                        onClick={() => {
                                            fetchMorePop({
                                                variables: {
                                                    limit: variablesPop?.limit,
                                                    cursor:
                                                        selectedSort.movies
                                                            .length,
                                                },
                                            });
                                        }}
                                    >
                                        Show more
                                    </Button>
                                ) : null}
                                {sort === 2 ? (
                                    <Button
                                        variantColor="teal"
                                        isLoading={loading}
                                        m={5}
                                        onClick={() => {
                                            fetchMoreMy({
                                                variables: {
                                                    limit: variablesMy?.limit,
                                                    creatorId:
                                                        variablesMy?.creatorId,
                                                    cursor:
                                                        selectedSort.movies[
                                                            selectedSort.movies
                                                                .length - 1
                                                        ].createdAt,
                                                },
                                            });
                                        }}
                                    >
                                        Show more
                                    </Button>
                                ) : null}
                            </Flex>
                        ) : null}
                    </>
                )}
            </Wrapper>
        </>
    );
};

export default withApollo({ ssr: false })(Movies);
