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
export declare type TotalCreateFormInputValues = {
    name?: string;
    val?: number;
};
export declare type TotalCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    val?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TotalCreateFormOverridesProps = {
    TotalCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    val?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TotalCreateFormProps = React.PropsWithChildren<{
    overrides?: TotalCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TotalCreateFormInputValues) => TotalCreateFormInputValues;
    onSuccess?: (fields: TotalCreateFormInputValues) => void;
    onError?: (fields: TotalCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TotalCreateFormInputValues) => TotalCreateFormInputValues;
    onValidate?: TotalCreateFormValidationValues;
} & React.CSSProperties>;
export default function TotalCreateForm(props: TotalCreateFormProps): React.ReactElement;
