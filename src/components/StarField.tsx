import { Flex, Icon, IconButton, Text } from "@chakra-ui/core";
import React from "react";
import { MovieInfoFragment } from "../generated/graphql";

interface StarFieldProps {
    movie?: MovieInfoFragment;
}

export const StarField: React.FC<StarFieldProps> = ({ movie }) => {
    const [stars, setStars] = React.useState(0);

    return (
        <Flex mt={2} mx={6} direction="column">
            <Flex direction="column">
                <Flex>
                    <Text fontWeight="bold" fontSize="md">
                        Movie DB-rating:
                    </Text>
                </Flex>
                <Flex my={2} align="center">
                    {Array(10)
                        .fill("")
                        .map((_, i) => (
                            <Icon
                                name="star"
                                key={i}
                                color={
                                    i < parseInt(movie!.rating)
                                        ? "teal.500"
                                        : "gray.300"
                                }
                            />
                        ))}
                    <Text ml={2} color="teal.500" fontWeight="bold">
                        {movie?.rating + "/10"}
                    </Text>
                </Flex>
            </Flex>
            <Flex>
                {Array(10)
                    .fill("")
                    .map((_, i) => (
                        <IconButton
                            icon="star"
                            variant="outline"
                            size="sm"
                            onClick={() => setStars(i + 1)}
                            aria-label="Give movie stars"
                            key={i}
                            color={i + 1 <= stars ? "teal.500" : "gray.300"}
                        />
                    ))}
            </Flex>
        </Flex>
    );
};
