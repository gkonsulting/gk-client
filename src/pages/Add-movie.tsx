import { Flex, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Navbar } from "../components/Navbar";
import { Wrapper } from "../components/Wrapper";
import { useAddMovieMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { userAuth } from "../utils/userAuth";
import { withApollo } from "../utils/withApollo";

interface MovieType {
    title: string;
    overview: string;
    imageBase: string;
    backdrop_path: string;
    vote_average: string;
}

const AddMovie: React.FC<{}> = ({}) => {
    // userAuth(); // Sjekker om bruker er logget inn, hvis ikke navigeres brukeren til login
    const [addMovie] = useAddMovieMutation();
    const [inputVisibility, setInputVisibility] = useState<Boolean>(true);

    const router = useRouter();
    return (
        <>
            <Navbar />
            <Wrapper variant="small">
                <Formik
                    initialValues={{
                        title: "",
                        description: "",
                        poster: "",
                        reason: "",
                        rating: "",
                    }}
                    onSubmit={async (values) => {
                        if (!inputVisibility) {
                            const { errors } = await addMovie({
                                variables: { input: values },
                                update: (cache) => {
                                    cache.evict({ fieldName: "getMovies" });
                                },
                            });
                            if (!errors) {
                                router.push("/Movies");
                            }
                        } else {
                            const movieInfo = require("movie-info");
                            await movieInfo(values.title).then(
                                (res: MovieType): void => {
                                    setInputVisibility(!inputVisibility);
                                    values.title = res.title!;
                                    values.description = res.overview;
                                    values.poster =
                                        res!.imageBase + res!.backdrop_path;
                                    values.rating = res!.vote_average.toString();
                                }
                            );
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <InputField
                                name="title"
                                placeholder="Title"
                                label="Title"
                            />
                            {inputVisibility ? null : (
                                <>
                                    <InputField
                                        name="description"
                                        placeholder="Description"
                                        label="Description"
                                        textarea
                                        height="100px"
                                    />
                                    <InputField
                                        name="rating"
                                        placeholder="IMDB-rating"
                                        label="Rating"
                                    />
                                    <InputField
                                        name="poster"
                                        placeholder="IMDB-poster link"
                                        label="IMDB-poster link"
                                    />
                                </>
                            )}
                            <InputField
                                name="reason"
                                placeholder="Why do you want to watch this movie?"
                                label="Reason why?"
                            />
                            <Flex justify="space-between" mt={4}>
                                {inputVisibility ? (
                                    <Button
                                        isLoading={isSubmitting}
                                        type="submit"
                                        variantColor="teal"
                                    >
                                        Preview
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            isLoading={isSubmitting}
                                            type="submit"
                                            variantColor="teal"
                                        >
                                            Add movie
                                        </Button>
                                        <Button
                                            isLoading={isSubmitting}
                                            type="submit"
                                            variantColor="teal"
                                            onClick={() =>
                                                setInputVisibility(
                                                    !inputVisibility
                                                )
                                            }
                                        >
                                            Try again
                                        </Button>
                                    </>
                                )}
                            </Flex>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        </>
    );
};
export default withApollo({ ssr: false })(AddMovie);
