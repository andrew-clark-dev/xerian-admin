import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { ItemGroup } from "./graphql/types";
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
export declare type ItemGroupUpdateFormInputValues = {
    quantity?: number;
    statuses?: string[];
};
export declare type ItemGroupUpdateFormValidationValues = {
    quantity?: ValidationFunction<number>;
    statuses?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ItemGroupUpdateFormOverridesProps = {
    ItemGroupUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    quantity?: PrimitiveOverrideProps<TextFieldProps>;
    statuses?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type ItemGroupUpdateFormProps = React.PropsWithChildren<{
    overrides?: ItemGroupUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    itemGroup?: ItemGroup;
    onSubmit?: (fields: ItemGroupUpdateFormInputValues) => ItemGroupUpdateFormInputValues;
    onSuccess?: (fields: ItemGroupUpdateFormInputValues) => void;
    onError?: (fields: ItemGroupUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ItemGroupUpdateFormInputValues) => ItemGroupUpdateFormInputValues;
    onValidate?: ItemGroupUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ItemGroupUpdateForm(props: ItemGroupUpdateFormProps): React.ReactElement;
