import * as React from "react";
import { GridProps, SelectFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ActionCreateFormInputValues = {
    description?: string;
    actor?: string;
    modelName?: string;
    refId?: string;
    type?: string;
    typeIndex?: string;
    before?: string;
    after?: string;
};
export declare type ActionCreateFormValidationValues = {
    description?: ValidationFunction<string>;
    actor?: ValidationFunction<string>;
    modelName?: ValidationFunction<string>;
    refId?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    typeIndex?: ValidationFunction<string>;
    before?: ValidationFunction<string>;
    after?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ActionCreateFormOverridesProps = {
    ActionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    actor?: PrimitiveOverrideProps<TextFieldProps>;
    modelName?: PrimitiveOverrideProps<TextFieldProps>;
    refId?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
    typeIndex?: PrimitiveOverrideProps<TextFieldProps>;
    before?: PrimitiveOverrideProps<TextAreaFieldProps>;
    after?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type ActionCreateFormProps = React.PropsWithChildren<{
    overrides?: ActionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ActionCreateFormInputValues) => ActionCreateFormInputValues;
    onSuccess?: (fields: ActionCreateFormInputValues) => void;
    onError?: (fields: ActionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ActionCreateFormInputValues) => ActionCreateFormInputValues;
    onValidate?: ActionCreateFormValidationValues;
} & React.CSSProperties>;
export default function ActionCreateForm(props: ActionCreateFormProps): React.ReactElement;
