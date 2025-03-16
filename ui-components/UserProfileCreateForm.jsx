/* eslint-disable */
"use client";
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createUserProfile } from "./graphql/mutations";
const client = generateClient();
export default function UserProfileCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    email: "",
    profileOwner: "",
    cognitoName: "",
    nickname: "",
    phoneNumber: "",
    status: "",
    role: "",
    photo: "",
    settings: "",
    deletedAt: "",
  };
  const [email, setEmail] = React.useState(initialValues.email);
  const [profileOwner, setProfileOwner] = React.useState(
    initialValues.profileOwner
  );
  const [cognitoName, setCognitoName] = React.useState(
    initialValues.cognitoName
  );
  const [nickname, setNickname] = React.useState(initialValues.nickname);
  const [phoneNumber, setPhoneNumber] = React.useState(
    initialValues.phoneNumber
  );
  const [status, setStatus] = React.useState(initialValues.status);
  const [role, setRole] = React.useState(initialValues.role);
  const [photo, setPhoto] = React.useState(initialValues.photo);
  const [settings, setSettings] = React.useState(initialValues.settings);
  const [deletedAt, setDeletedAt] = React.useState(initialValues.deletedAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setEmail(initialValues.email);
    setProfileOwner(initialValues.profileOwner);
    setCognitoName(initialValues.cognitoName);
    setNickname(initialValues.nickname);
    setPhoneNumber(initialValues.phoneNumber);
    setStatus(initialValues.status);
    setRole(initialValues.role);
    setPhoto(initialValues.photo);
    setSettings(initialValues.settings);
    setDeletedAt(initialValues.deletedAt);
    setErrors({});
  };
  const validations = {
    email: [],
    profileOwner: [],
    cognitoName: [],
    nickname: [],
    phoneNumber: [],
    status: [],
    role: [],
    photo: [{ type: "URL" }],
    settings: [{ type: "JSON" }],
    deletedAt: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          email,
          profileOwner,
          cognitoName,
          nickname,
          phoneNumber,
          status,
          role,
          photo,
          settings,
          deletedAt,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createUserProfile.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "UserProfileCreateForm")}
      {...rest}
    >
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email: value,
              profileOwner,
              cognitoName,
              nickname,
              phoneNumber,
              status,
              role,
              photo,
              settings,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Profile owner"
        isRequired={false}
        isReadOnly={false}
        value={profileOwner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              profileOwner: value,
              cognitoName,
              nickname,
              phoneNumber,
              status,
              role,
              photo,
              settings,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.profileOwner ?? value;
          }
          if (errors.profileOwner?.hasError) {
            runValidationTasks("profileOwner", value);
          }
          setProfileOwner(value);
        }}
        onBlur={() => runValidationTasks("profileOwner", profileOwner)}
        errorMessage={errors.profileOwner?.errorMessage}
        hasError={errors.profileOwner?.hasError}
        {...getOverrideProps(overrides, "profileOwner")}
      ></TextField>
      <TextField
        label="Cognito name"
        isRequired={false}
        isReadOnly={false}
        value={cognitoName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              profileOwner,
              cognitoName: value,
              nickname,
              phoneNumber,
              status,
              role,
              photo,
              settings,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.cognitoName ?? value;
          }
          if (errors.cognitoName?.hasError) {
            runValidationTasks("cognitoName", value);
          }
          setCognitoName(value);
        }}
        onBlur={() => runValidationTasks("cognitoName", cognitoName)}
        errorMessage={errors.cognitoName?.errorMessage}
        hasError={errors.cognitoName?.hasError}
        {...getOverrideProps(overrides, "cognitoName")}
      ></TextField>
      <TextField
        label="Nickname"
        isRequired={false}
        isReadOnly={false}
        value={nickname}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              profileOwner,
              cognitoName,
              nickname: value,
              phoneNumber,
              status,
              role,
              photo,
              settings,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.nickname ?? value;
          }
          if (errors.nickname?.hasError) {
            runValidationTasks("nickname", value);
          }
          setNickname(value);
        }}
        onBlur={() => runValidationTasks("nickname", nickname)}
        errorMessage={errors.nickname?.errorMessage}
        hasError={errors.nickname?.hasError}
        {...getOverrideProps(overrides, "nickname")}
      ></TextField>
      <TextField
        label="Phone number"
        isRequired={false}
        isReadOnly={false}
        value={phoneNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              profileOwner,
              cognitoName,
              nickname,
              phoneNumber: value,
              status,
              role,
              photo,
              settings,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.phoneNumber ?? value;
          }
          if (errors.phoneNumber?.hasError) {
            runValidationTasks("phoneNumber", value);
          }
          setPhoneNumber(value);
        }}
        onBlur={() => runValidationTasks("phoneNumber", phoneNumber)}
        errorMessage={errors.phoneNumber?.errorMessage}
        hasError={errors.phoneNumber?.hasError}
        {...getOverrideProps(overrides, "phoneNumber")}
      ></TextField>
      <SelectField
        label="Status"
        placeholder="Please select an option"
        isDisabled={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              profileOwner,
              cognitoName,
              nickname,
              phoneNumber,
              status: value,
              role,
              photo,
              settings,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      >
        <option
          children="Active"
          value="Active"
          {...getOverrideProps(overrides, "statusoption0")}
        ></option>
        <option
          children="Inactive"
          value="Inactive"
          {...getOverrideProps(overrides, "statusoption1")}
        ></option>
        <option
          children="Suspended"
          value="Suspended"
          {...getOverrideProps(overrides, "statusoption2")}
        ></option>
        <option
          children="Pending"
          value="Pending"
          {...getOverrideProps(overrides, "statusoption3")}
        ></option>
      </SelectField>
      <SelectField
        label="Role"
        placeholder="Please select an option"
        isDisabled={false}
        value={role}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              profileOwner,
              cognitoName,
              nickname,
              phoneNumber,
              status,
              role: value,
              photo,
              settings,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.role ?? value;
          }
          if (errors.role?.hasError) {
            runValidationTasks("role", value);
          }
          setRole(value);
        }}
        onBlur={() => runValidationTasks("role", role)}
        errorMessage={errors.role?.errorMessage}
        hasError={errors.role?.hasError}
        {...getOverrideProps(overrides, "role")}
      >
        <option
          children="Admin"
          value="Admin"
          {...getOverrideProps(overrides, "roleoption0")}
        ></option>
        <option
          children="Manager"
          value="Manager"
          {...getOverrideProps(overrides, "roleoption1")}
        ></option>
        <option
          children="Employee"
          value="Employee"
          {...getOverrideProps(overrides, "roleoption2")}
        ></option>
        <option
          children="Service"
          value="Service"
          {...getOverrideProps(overrides, "roleoption3")}
        ></option>
        <option
          children="Guest"
          value="Guest"
          {...getOverrideProps(overrides, "roleoption4")}
        ></option>
      </SelectField>
      <TextField
        label="Photo"
        isRequired={false}
        isReadOnly={false}
        value={photo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              profileOwner,
              cognitoName,
              nickname,
              phoneNumber,
              status,
              role,
              photo: value,
              settings,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.photo ?? value;
          }
          if (errors.photo?.hasError) {
            runValidationTasks("photo", value);
          }
          setPhoto(value);
        }}
        onBlur={() => runValidationTasks("photo", photo)}
        errorMessage={errors.photo?.errorMessage}
        hasError={errors.photo?.hasError}
        {...getOverrideProps(overrides, "photo")}
      ></TextField>
      <TextAreaField
        label="Settings"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              email,
              profileOwner,
              cognitoName,
              nickname,
              phoneNumber,
              status,
              role,
              photo,
              settings: value,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.settings ?? value;
          }
          if (errors.settings?.hasError) {
            runValidationTasks("settings", value);
          }
          setSettings(value);
        }}
        onBlur={() => runValidationTasks("settings", settings)}
        errorMessage={errors.settings?.errorMessage}
        hasError={errors.settings?.hasError}
        {...getOverrideProps(overrides, "settings")}
      ></TextAreaField>
      <TextField
        label="Deleted at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={deletedAt && convertToLocal(new Date(deletedAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              email,
              profileOwner,
              cognitoName,
              nickname,
              phoneNumber,
              status,
              role,
              photo,
              settings,
              deletedAt: value,
            };
            const result = onChange(modelFields);
            value = result?.deletedAt ?? value;
          }
          if (errors.deletedAt?.hasError) {
            runValidationTasks("deletedAt", value);
          }
          setDeletedAt(value);
        }}
        onBlur={() => runValidationTasks("deletedAt", deletedAt)}
        errorMessage={errors.deletedAt?.errorMessage}
        hasError={errors.deletedAt?.hasError}
        {...getOverrideProps(overrides, "deletedAt")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
