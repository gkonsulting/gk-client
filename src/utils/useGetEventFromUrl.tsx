import { useGetEventQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetEventFromUrl = () => {
    const intId = useGetIntId();    
    return useGetEventQuery({
        skip: intId === -1,
        variables: {
            id: intId,
        },
    });
};
