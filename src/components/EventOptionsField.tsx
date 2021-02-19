import { Flex, IconButton } from "@chakra-ui/core";
import React from "react";
import { useRouter } from "next/router";
import {
    EventInfoFragment,
    useDeleteEventMutation,
} from "../generated/graphql";

interface EventOptionsFieldProps {
    event: EventInfoFragment;
}

export const EventOptionsField: React.FC<EventOptionsFieldProps> = ({
    event,
}) => {
    const [deleteEvent] = useDeleteEventMutation();
    const router = useRouter();
    return (
        <Flex pr={6}>
            <IconButton
                icon="delete"
                size="sm"
                variantColor="teal"
                aria-label="Delete Movie"
                mr={3}
                w={10}
                onClick={async () =>
                    await deleteEvent({
                        variables: {
                            id: event?.id,
                        },
                        update: (cache) => {
                            cache.evict({
                                id: "Event:" + event?.id,
                            });
                        },
                    }).then(() => {
                        router.push("/Events");
                    })
                }
            />
        </Flex>
    );
};
