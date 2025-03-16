import * as React from "react";
import { GridProps, SelectFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Action } from "./graphql/types";
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
export declare type ActionUpdateFormInputValues = {
    description?: string;
    actor?: string;
    modelName?: string;
    refId?: string;
    type?: string;
    typeIndex?: string;
    before?: string;
    after?: string;
};
export declare type ActionUpdateFormValidationValues = {
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
export declare type ActionUpdateFormOverridesProps = {
    ActionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    actor?: PrimitiveOverrideProps<TextFieldProps>;
    modelName?: PrimitiveOverrideProps<TextFieldProps>;
    refId?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
    typeIndex?: PrimitiveOverrideProps<TextFieldProps>;
    before?: PrimitiveOverrideProps<TextAreaFieldProps>;
    after?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type ActionUpdateFormProps = React.PropsWithChildren<{
    overrides?: ActionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    action?: Action;
    onSubmit?: (fields: ActionUpdateFormInputValues) => ActionUpdateFormInputValues;
    onSuccess?: (fields: ActionUpdateFormInputValues) => void;
    onError?: (fields: ActionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ActionUpdateFormInputValues) => ActionUpdateFormInputValues;
    onValidate?: ActionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ActionUpdateForm(props: ActionUpdateFormProps): React.ReactElement;
