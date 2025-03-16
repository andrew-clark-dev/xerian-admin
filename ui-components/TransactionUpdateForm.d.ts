import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Transaction } from "./graphql/types";
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
export declare type TransactionUpdateFormInputValues = {
    createdAt?: string;
    updatedAt?: string;
    lastActivityBy?: string;
    paymentType?: string;
    type?: string;
    amount?: number;
    tax?: number;
    status?: string;
    linked?: string;
};
export declare type TransactionUpdateFormValidationValues = {
    createdAt?: ValidationFunction<string>;
    updatedAt?: ValidationFunction<string>;
    lastActivityBy?: ValidationFunction<string>;
    paymentType?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    amount?: ValidationFunction<number>;
    tax?: ValidationFunction<number>;
    status?: ValidationFunction<string>;
    linked?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TransactionUpdateFormOverridesProps = {
    TransactionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    updatedAt?: PrimitiveOverrideProps<TextFieldProps>;
    lastActivityBy?: PrimitiveOverrideProps<TextFieldProps>;
    paymentType?: PrimitiveOverrideProps<SelectFieldProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    tax?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    linked?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TransactionUpdateFormProps = React.PropsWithChildren<{
    overrides?: TransactionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    transaction?: Transaction;
    onSubmit?: (fields: TransactionUpdateFormInputValues) => TransactionUpdateFormInputValues;
    onSuccess?: (fields: TransactionUpdateFormInputValues) => void;
    onError?: (fields: TransactionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TransactionUpdateFormInputValues) => TransactionUpdateFormInputValues;
    onValidate?: TransactionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TransactionUpdateForm(props: TransactionUpdateFormProps): React.ReactElement;
