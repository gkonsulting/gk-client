import { useApolloClient } from "@apollo/client";
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    IconButton,
    Link,
    Stack,
    useDisclosure,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import NextLink from "next/link";

export const CustomDrawer: React.FC<{}> = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [logout, { loading: logoutFetching }] = useLogoutMutation();

    const btnRef = useRef() as React.RefObject<HTMLElement>;
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
            <Stack spacing={5}>
                <Box w="100%" mt={{ base: 4, md: 0 }} mr={5}>
                    <NextLink href="/Vlog">
                        <Link _hover={{ textDecoration: "none" }}>
                            <Button w="100%" variantColor="teal" border="1px">
                                Vlog
                            </Button>
                        </Link>
                    </NextLink>
                </Box>
            </Stack>
        );
        bodyUser = (
            <>
                <Box mt={{ base: 4, md: 0 }} mr={6}>
                    <NextLink href="/Login">
                        <Link _hover={{ textDecoration: "none" }}>
                            <Button variantColor="teal" border="1px">
                                Login
                            </Button>
                        </Link>
                    </NextLink>
                </Box>
                <Box mt={{ base: 4, md: 0 }} mr={6}>
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
            <Stack spacing={5}>
                <Box w="100%" mt={{ base: 4, md: 0 }} mr={5}>
                    <NextLink href="/Vlog">
                        <Link _hover={{ textDecoration: "none" }}>
                            <Button w="100%" variantColor="teal" border="1px">
                                Vlog
                            </Button>
                        </Link>
                    </NextLink>
                </Box>
                <Box w="100%" mt={{ base: 4, md: 0 }} mr={5}>
                    <NextLink href="/Movies">
                        <Link _hover={{ textDecoration: "none" }}>
                            <Button w="100%" variantColor="teal" border="1px">
                                Movies
                            </Button>
                        </Link>
                    </NextLink>
                </Box>
            </Stack>
        );
        bodyUser = (
            <>
                <Box mt={{ base: 4, md: 0 }} mr={6}>
                    <NextLink href="/User/[id]" as={`/User/${data.me.id}`}>
                        <Link _hover={{ textDecoration: "none" }}>
                            <Button variantColor="teal" border="1px">
                                User: {data.me.username}
                            </Button>
                        </Link>
                    </NextLink>
                </Box>
                <Box mt={{ base: 4, md: 0 }} mr={6}>
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
        <>
            <IconButton
                icon="drag-handle"
                ref={btnRef}
                variantColor="teal"
                aria-label="settings"
                onClick={onOpen}
            />
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
                isFullHeight={true}
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>GK</DrawerHeader>

                        <DrawerBody>{bodyActions}</DrawerBody>

                        <DrawerFooter mb="20">{bodyUser}</DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    );
};
