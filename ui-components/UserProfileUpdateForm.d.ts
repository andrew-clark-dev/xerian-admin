import * as React from "react";
import { GridProps, SelectFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { UserProfile } from "./graphql/types";
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
export declare type UserProfileUpdateFormInputValues = {
    email?: string;
    profileOwner?: string;
    cognitoName?: string;
    nickname?: string;
    phoneNumber?: string;
    status?: string;
    role?: string;
    photo?: string;
    settings?: string;
    deletedAt?: string;
};
export declare type UserProfileUpdateFormValidationValues = {
    email?: ValidationFunction<string>;
    profileOwner?: ValidationFunction<string>;
    cognitoName?: ValidationFunction<string>;
    nickname?: ValidationFunction<string>;
    phoneNumber?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    role?: ValidationFunction<string>;
    photo?: ValidationFunction<string>;
    settings?: ValidationFunction<string>;
    deletedAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserProfileUpdateFormOverridesProps = {
    UserProfileUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    profileOwner?: PrimitiveOverrideProps<TextFieldProps>;
    cognitoName?: PrimitiveOverrideProps<TextFieldProps>;
    nickname?: PrimitiveOverrideProps<TextFieldProps>;
    phoneNumber?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    role?: PrimitiveOverrideProps<SelectFieldProps>;
    photo?: PrimitiveOverrideProps<TextFieldProps>;
    settings?: PrimitiveOverrideProps<TextAreaFieldProps>;
    deletedAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserProfileUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserProfileUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userProfile?: UserProfile;
    onSubmit?: (fields: UserProfileUpdateFormInputValues) => UserProfileUpdateFormInputValues;
    onSuccess?: (fields: UserProfileUpdateFormInputValues) => void;
    onError?: (fields: UserProfileUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserProfileUpdateFormInputValues) => UserProfileUpdateFormInputValues;
    onValidate?: UserProfileUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserProfileUpdateForm(props: UserProfileUpdateFormProps): React.ReactElement;
