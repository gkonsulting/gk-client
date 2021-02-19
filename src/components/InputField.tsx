import React, { InputHTMLAttributes } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Textarea,
} from "@chakra-ui/core";
import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    textarea?: boolean;
    css?: any;
};
export const InputField: React.FC<InputFieldProps> = ({
    label,
    size: _,
    textarea,
    ...props
}) => {
    let InputOrTextarea = Input;
    if (textarea) {
        InputOrTextarea = Textarea;
    }
    const [field, { error }] = useField(props);

    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <InputOrTextarea
                css={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                }}
                {...field}
                {...props}
                id={field.name}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};
