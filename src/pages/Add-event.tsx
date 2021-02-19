import { Flex, Button, FormHelperText, FormLabel } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Navbar } from "../components/Navbar";
import { Wrapper } from "../components/Wrapper";
import { useAddEventMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { userAuth } from "../utils/userAuth";
import { withApollo } from "../utils/withApollo";
import DatePicker from "react-datepicker";
import styles from "../components/Datepicker.module.css";

const AddEvent: React.FC<{}> = ({}) => {
    userAuth(); // Sjekker om bruker er logget inn, hvis ikke navigeres brukeren til login
    const [addEvent] = useAddEventMutation();

    const router = useRouter();
    return (
        <>
            <Navbar />
            <Wrapper variant="small">
                <Formik
                    initialValues={{
                        title: "",
                        date: new Date().toISOString(),
                        address: "",
                        description: "",
                        thumbnail: "",
                    }}
                    onSubmit={async (values) => {
                        const { errors } = await addEvent({
                            variables: { input: values },
                            update: (cache) => {
                                cache.evict({ fieldName: "getEvents" });
                            },
                        });
                        if (!errors) {
                            router.push("/Events");
                        }
                    }}
                >
                    {({ isSubmitting, setFieldValue, values }) => (
                        <Form>
                            <InputField
                                name="title"
                                placeholder="Title"
                                label="Title"
                            />
                            <FormLabel htmlFor="date">Date</FormLabel>
                            <Flex>
                                <DatePicker
                                    name="date"
                                    selected={new Date(values.date)}
                                    onChange={(date: Date) =>
                                        setFieldValue(
                                            "date",
                                            date.toISOString()
                                        )
                                    }
                                    showPopperArrow={true}
                                    showTimeSelect
                                    className={styles.picker}
                                    dateFormat="MMMM d, yyyy - HH:mm"
                                    timeFormat="HH:mm"
                                />
                            </Flex>
                            <InputField
                                name="address"
                                placeholder="Address"
                                label="Address"
                            />
                            <InputField
                                name="description"
                                placeholder="Description"
                                label="Description"
                                textarea
                                height="150px"
                            />
                            <InputField
                                name="thumbnail"
                                placeholder="Thumbnail"
                                label="Thumbnail"
                            />

                            <Flex justify="space-between" mt={4}>
                                <Button
                                    isLoading={isSubmitting}
                                    type="submit"
                                    variantColor="teal"
                                >
                                    Add event
                                </Button>
                            </Flex>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        </>
    );
};
export default withApollo({ ssr: false })(AddEvent);
