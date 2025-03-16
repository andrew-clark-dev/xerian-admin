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
export declare type ItemGroupCreateFormInputValues = {
    quantity?: number;
    statuses?: string[];
};
export declare type ItemGroupCreateFormValidationValues = {
    quantity?: ValidationFunction<number>;
    statuses?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ItemGroupCreateFormOverridesProps = {
    ItemGroupCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    quantity?: PrimitiveOverrideProps<TextFieldProps>;
    statuses?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type ItemGroupCreateFormProps = React.PropsWithChildren<{
    overrides?: ItemGroupCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ItemGroupCreateFormInputValues) => ItemGroupCreateFormInputValues;
    onSuccess?: (fields: ItemGroupCreateFormInputValues) => void;
    onError?: (fields: ItemGroupCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ItemGroupCreateFormInputValues) => ItemGroupCreateFormInputValues;
    onValidate?: ItemGroupCreateFormValidationValues;
} & React.CSSProperties>;
export default function ItemGroupCreateForm(props: ItemGroupCreateFormProps): React.ReactElement;
