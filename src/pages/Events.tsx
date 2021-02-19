import { Wrapper } from "../components/Wrapper";
import { Navbar } from "../components/Navbar";
import {
    EventInfoFragment,
    useGetEventsQuery,
} from "../generated/graphql";
import { Button, Flex, Link, Text } from "@chakra-ui/core";
import React from "react";
import { withApollo } from "../utils/withApollo";
import { userAuth } from "../utils/userAuth";
import Loader from "react-loader-spinner";
import NextLink from "next/link";
import { EventCard } from "../components/EventCard";

const Movies = () => {
    userAuth();

    const { data, loading, variables, fetchMore } = useGetEventsQuery({
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
                        Events
                    </Text>
                    <Flex>
                        <NextLink href="/Add-event">
                            <Link _hover={{ textDecoration: "none" }}>
                                <Button variantColor="teal" border="1px">
                                    Add event
                                </Button>
                            </Link>
                        </NextLink>
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
                                : data?.getEvents.events.map(
                                      (event: EventInfoFragment, i: number) =>
                                          !event ? null : (
                                              <Flex
                                                  direction="column"
                                                  align="center"
                                                  key={i}
                                                  my={3}
                                              >
                                                  <EventCard event={event} />
                                              </Flex>
                                          )
                                  )}
                        </Flex>
                        {data && data.getEvents?.hasMore ? (
                            <Flex justifyContent="center">
                                <Button
                                    variantColor="teal"
                                    isLoading={loading}
                                    m={5}
                                    onClick={() => {
                                        fetchMore({
                                            variables: {
                                                limit: variables?.limit,
                                                cursor:
                                                    data.getEvents.events[
                                                        data.getEvents.events
                                                            .length - 1
                                                    ].createdAt,
                                            },
                                        });
                                    }}
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
