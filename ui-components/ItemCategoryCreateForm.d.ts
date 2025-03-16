import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ItemCategoryCreateFormInputValues = {
    lastActivityBy?: string;
    categoryKind?: string;
    kind?: string;
    name?: string;
    matchNames?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
};
export declare type ItemCategoryCreateFormValidationValues = {
    lastActivityBy?: ValidationFunction<string>;
    categoryKind?: ValidationFunction<string>;
    kind?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    matchNames?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    updatedAt?: ValidationFunction<string>;
    deletedAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ItemCategoryCreateFormOverridesProps = {
    ItemCategoryCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    lastActivityBy?: PrimitiveOverrideProps<TextFieldProps>;
    categoryKind?: PrimitiveOverrideProps<SelectFieldProps>;
    kind?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    matchNames?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    updatedAt?: PrimitiveOverrideProps<TextFieldProps>;
    deletedAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ItemCategoryCreateFormProps = React.PropsWithChildren<{
    overrides?: ItemCategoryCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ItemCategoryCreateFormInputValues) => ItemCategoryCreateFormInputValues;
    onSuccess?: (fields: ItemCategoryCreateFormInputValues) => void;
    onError?: (fields: ItemCategoryCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ItemCategoryCreateFormInputValues) => ItemCategoryCreateFormInputValues;
    onValidate?: ItemCategoryCreateFormValidationValues;
} & React.CSSProperties>;
export default function ItemCategoryCreateForm(props: ItemCategoryCreateFormProps): React.ReactElement;
