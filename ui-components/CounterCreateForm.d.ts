import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type CounterCreateFormInputValues = {
    name?: string;
    val?: number;
};
export declare type CounterCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    val?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CounterCreateFormOverridesProps = {
    CounterCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    val?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CounterCreateFormProps = React.PropsWithChildren<{
    overrides?: CounterCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CounterCreateFormInputValues) => CounterCreateFormInputValues;
    onSuccess?: (fields: CounterCreateFormInputValues) => void;
    onError?: (fields: CounterCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CounterCreateFormInputValues) => CounterCreateFormInputValues;
    onValidate?: CounterCreateFormValidationValues;
} & React.CSSProperties>;
export default function CounterCreateForm(props: CounterCreateFormProps): React.ReactElement;
