import { ApolloCache, gql } from "@apollo/client";
import { Flex, Link, IconButton } from "@chakra-ui/core";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MovieInfoFragment, UpdateSeenMutation, useDeleteMovieMutation, useMeQuery, useUpdateSeenMutation } from "../generated/graphql";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface MovieOptionsFieldProps {
    movie: MovieInfoFragment;
}

const updateAfterSeen = (
    value: boolean,
    movieId: number,
    cache: ApolloCache<UpdateSeenMutation>
) => {
    const data = cache.readFragment<{
        id: number;
        seen: boolean;
    }>({
        id: "Movie:" + movieId,
        fragment: gql`
            fragment _ on Movie {
                id
                seen
            }
        `,
    });

    if (data) {
        if (data.seen === value) {
            return;
        }
        const newValue = value;
        cache.writeFragment({
            id: "Movie:" + movieId,
            fragment: gql`
                fragment __ on Movie {
                    seen
                }
            `,
            data: { seen: newValue },
        });
    }
};

export const MovieOptionsField: React.FC<MovieOptionsFieldProps> = ({
    movie,
}) => {
    const [deleteMovie] = useDeleteMovieMutation();
    const [updateSeen] = useUpdateSeenMutation();
    const { data } = useMeQuery();
    const router = useRouter();
    return (
        <Flex pr={6}>
            <NextLink
                href="/Movie/Update/[id]"
                as={`/Movie/Update/${movie?.id}`}
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
                mr={3}
                w={10}
                onClick={async () =>
                    await deleteMovie({
                        variables: {
                            id: movie?.id,
                        },
                        update: (cache) => {
                            cache.evict({
                                id: "Movie:" + movie?.id,
                            });
                        },
                    }).then(() => {
                        router.push("/Movies");
                    })
                }
            />
            {!movie.seen ? (
                <IconButton
                    variantColor="teal"
                    size="sm"
                    icon={FaEye}
                    aria-label="Have watched"
                    w={10}
                    onClick={async () => {
                        await updateSeen({
                            variables: {
                                id: movie!.id,
                                seen: true,
                            },
                            update: (cache) =>
                                updateAfterSeen(true, movie.id, cache),
                        });
                    }}
                />
            ) : (
                <IconButton
                    variantColor="teal"
                    size="sm"
                    icon={FaEyeSlash}
                    aria-label="Have not watched"
                    w={10}
                    onClick={async () => {
                        await updateSeen({
                            variables: {
                                id: movie!.id,
                                seen: false,
                            },
                            update: (cache) =>
                                updateAfterSeen(false, movie.id, cache),
                        });
                    }}
                />
            )}
        </Flex>
    );
};
