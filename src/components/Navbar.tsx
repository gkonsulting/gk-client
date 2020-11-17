import React from "react";
import { Box, Heading, Flex, Text, Button, Link } from "@chakra-ui/core";
import { DarkModeSwitch } from "./DarkModeSwitch";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { CustomDrawer } from "./CustomDrawer";
import useWindowSize from "../utils/useWindowSize";

export const Navbar: React.FC<{}> = (props) => {
    const [logout, { loading: logoutFetching }] = useLogoutMutation();
    const size = useWindowSize();

    const { data, loading } = useMeQuery({
        skip: isServer(), // fetcher ikke CS, bare SSR
    });
    const apolloClient = useApolloClient();
    const router = useRouter();

    let bodyUser = null;
    let bodyActions = null;
    if (loading) {
    } else if (!data?.me) {
        bodyActions = (
            <>
                <Box as="text" fontSize="xl" mt={{ base: 4, md: 0 }} mr={5}>
                    <NextLink href="/Vlog">
                        <Link>Vlogs</Link>
                    </NextLink>
                </Box>
            </>
        );
        bodyUser = (
            <>
                <Box mt={{ base: 4, md: 0 }} mr={5}>
                    <NextLink href="/Login">
                        <Link _hover={{ textDecoration: "none" }}>
                            <Button variantColor="teal" border="1px">
                                Login
                            </Button>
                        </Link>
                    </NextLink>
                </Box>
                <Box mt={{ base: 4, md: 0 }} mr={5}>
                    <NextLink href="/Register">
                        <Link _hover={{ textDecoration: "none" }}>
                            <Button variantColor="teal" border="1px">
                                Register
                            </Button>
                        </Link>
                    </NextLink>
                </Box>
            </>
        );
    } else {
        bodyActions = (
            <>
                <Box as="text" fontSize="xl" mt={{ base: 4, md: 0 }} mr={5}>
                    <NextLink href="/Vlog">
                        <Link>Vlogs</Link>
                    </NextLink>
                </Box>
                <Box as="text" fontSize="xl" mt={{ base: 4, md: 0 }} mr={5}>
                    <NextLink href="/Movies">
                        <Link>Movies</Link>
                    </NextLink>
                </Box>
            </>
        );
        bodyUser = (
            <>
                <Box mt={{ base: 4, md: 0 }} mr={5}>
                    <NextLink href="/User/[id]" as={`/User/${data.me.id}`}>
                        <Link _hover={{ textDecoration: "none" }}>
                            <Button variantColor="teal" border="1px">
                                User: {data.me.username}
                            </Button>
                        </Link>
                    </NextLink>
                </Box>
                <Box mt={{ base: 4, md: 0 }} mr={5}>
                    <Button
                        onClick={async () => {
                            await logout();
                            await apolloClient.resetStore();
                            router.push("/Login");
                        }}
                        isLoading={logoutFetching}
                        variantColor="teal"
                        border="1px"
                    >
                        Logout
                    </Button>
                </Box>
            </>
        );
    }
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding="1.5rem"
            bg="black"
            position="sticky"
            top={0}
            zIndex={1}
            {...props}
        >
            <Flex align="center" mr={5}>
                <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
                    <NextLink href="/">
                        <NextLink href="/">
                            <Link _hover={{ textDecoration: "none" }}>
                                <Text fontSize={36} color="teal.500">
                                    GK
                                </Text>
                            </Link>
                        </NextLink>
                    </NextLink>
                </Heading>
            </Flex>
            {size.width < 650 ? (
                <CustomDrawer></CustomDrawer>
            ) : (
                <>
                    <Box ml={5} display="flex" flexGrow={1}>
                        {bodyActions}
                    </Box>
                    <Flex justifyContent={"row-reverse"} alignItems={"center"}>
                        {bodyUser}
                        <Box mt={{ base: 4, md: 0 }} mr={5}>
                            <DarkModeSwitch />
                        </Box>
                    </Flex>
                </>
            )}
        </Flex>
    );
};
