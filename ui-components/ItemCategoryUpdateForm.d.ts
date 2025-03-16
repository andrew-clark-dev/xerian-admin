import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { ItemCategory } from "./graphql/types";
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
export declare type ItemCategoryUpdateFormInputValues = {
    lastActivityBy?: string;
    categoryKind?: string;
    kind?: string;
    name?: string;
    matchNames?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
};
export declare type ItemCategoryUpdateFormValidationValues = {
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
export declare type ItemCategoryUpdateFormOverridesProps = {
    ItemCategoryUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    lastActivityBy?: PrimitiveOverrideProps<TextFieldProps>;
    categoryKind?: PrimitiveOverrideProps<SelectFieldProps>;
    kind?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    matchNames?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    updatedAt?: PrimitiveOverrideProps<TextFieldProps>;
    deletedAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ItemCategoryUpdateFormProps = React.PropsWithChildren<{
    overrides?: ItemCategoryUpdateFormOverridesProps | undefined | null;
} & {
    id?: {
        kind: string;
        name: string;
    };
    itemCategory?: ItemCategory;
    onSubmit?: (fields: ItemCategoryUpdateFormInputValues) => ItemCategoryUpdateFormInputValues;
    onSuccess?: (fields: ItemCategoryUpdateFormInputValues) => void;
    onError?: (fields: ItemCategoryUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ItemCategoryUpdateFormInputValues) => ItemCategoryUpdateFormInputValues;
    onValidate?: ItemCategoryUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ItemCategoryUpdateForm(props: ItemCategoryUpdateFormProps): React.ReactElement;
