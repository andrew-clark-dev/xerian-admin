import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Sale } from "./graphql/types";
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
export declare type SaleUpdateFormInputValues = {
    number?: string;
    lastActivityBy?: string;
    customerEmail?: string;
    accountNumber?: string;
    status?: string;
    gross?: number;
    subTotal?: number;
    total?: number;
    tax?: number;
    change?: number;
    refund?: number;
    accountTotal?: number;
    storeTotal?: number;
    transaction?: string;
    refundedSale?: string;
    createdAt?: string;
    updatedAt?: string;
};
export declare type SaleUpdateFormValidationValues = {
    number?: ValidationFunction<string>;
    lastActivityBy?: ValidationFunction<string>;
    customerEmail?: ValidationFunction<string>;
    accountNumber?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    gross?: ValidationFunction<number>;
    subTotal?: ValidationFunction<number>;
    total?: ValidationFunction<number>;
    tax?: ValidationFunction<number>;
    change?: ValidationFunction<number>;
    refund?: ValidationFunction<number>;
    accountTotal?: ValidationFunction<number>;
    storeTotal?: ValidationFunction<number>;
    transaction?: ValidationFunction<string>;
    refundedSale?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    updatedAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SaleUpdateFormOverridesProps = {
    SaleUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    number?: PrimitiveOverrideProps<TextFieldProps>;
    lastActivityBy?: PrimitiveOverrideProps<TextFieldProps>;
    customerEmail?: PrimitiveOverrideProps<TextFieldProps>;
    accountNumber?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    gross?: PrimitiveOverrideProps<TextFieldProps>;
    subTotal?: PrimitiveOverrideProps<TextFieldProps>;
    total?: PrimitiveOverrideProps<TextFieldProps>;
    tax?: PrimitiveOverrideProps<TextFieldProps>;
    change?: PrimitiveOverrideProps<TextFieldProps>;
    refund?: PrimitiveOverrideProps<TextFieldProps>;
    accountTotal?: PrimitiveOverrideProps<TextFieldProps>;
    storeTotal?: PrimitiveOverrideProps<TextFieldProps>;
    transaction?: PrimitiveOverrideProps<TextFieldProps>;
    refundedSale?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    updatedAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SaleUpdateFormProps = React.PropsWithChildren<{
    overrides?: SaleUpdateFormOverridesProps | undefined | null;
} & {
    number?: string;
    sale?: Sale;
    onSubmit?: (fields: SaleUpdateFormInputValues) => SaleUpdateFormInputValues;
    onSuccess?: (fields: SaleUpdateFormInputValues) => void;
    onError?: (fields: SaleUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SaleUpdateFormInputValues) => SaleUpdateFormInputValues;
    onValidate?: SaleUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SaleUpdateForm(props: SaleUpdateFormProps): React.ReactElement;
