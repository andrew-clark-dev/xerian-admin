import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Counter } from "./graphql/types";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CounterUpdateFormInputValues = {
    name?: string;
    val?: number;
};
export declare type CounterUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    val?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CounterUpdateFormOverridesProps = {
    CounterUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    val?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CounterUpdateFormProps = React.PropsWithChildren<{
    overrides?: CounterUpdateFormOverridesProps | undefined | null;
} & {
    name?: string;
    counter?: Counter;
    onSubmit?: (fields: CounterUpdateFormInputValues) => CounterUpdateFormInputValues;
    onSuccess?: (fields: CounterUpdateFormInputValues) => void;
    onError?: (fields: CounterUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CounterUpdateFormInputValues) => CounterUpdateFormInputValues;
    onValidate?: CounterUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CounterUpdateForm(props: CounterUpdateFormProps): React.ReactElement;
