/* eslint-disable */
"use client";
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createItemCategory } from "./graphql/mutations";
const client = generateClient();
export default function ItemCategoryCreateForm(props) {
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
    lastActivityBy: "",
    categoryKind: "",
    kind: "",
    name: "",
    matchNames: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
  };
  const [lastActivityBy, setLastActivityBy] = React.useState(
    initialValues.lastActivityBy
  );
  const [categoryKind, setCategoryKind] = React.useState(
    initialValues.categoryKind
  );
  const [kind, setKind] = React.useState(initialValues.kind);
  const [name, setName] = React.useState(initialValues.name);
  const [matchNames, setMatchNames] = React.useState(initialValues.matchNames);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [updatedAt, setUpdatedAt] = React.useState(initialValues.updatedAt);
  const [deletedAt, setDeletedAt] = React.useState(initialValues.deletedAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setLastActivityBy(initialValues.lastActivityBy);
    setCategoryKind(initialValues.categoryKind);
    setKind(initialValues.kind);
    setName(initialValues.name);
    setMatchNames(initialValues.matchNames);
    setCreatedAt(initialValues.createdAt);
    setUpdatedAt(initialValues.updatedAt);
    setDeletedAt(initialValues.deletedAt);
    setErrors({});
  };
  const validations = {
    lastActivityBy: [{ type: "Required" }],
    categoryKind: [{ type: "Required" }],
    kind: [{ type: "Required" }],
    name: [{ type: "Required" }],
    matchNames: [{ type: "Required" }],
    createdAt: [],
    updatedAt: [],
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
          lastActivityBy,
          categoryKind,
          kind,
          name,
          matchNames,
          createdAt,
          updatedAt,
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
            query: createItemCategory.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "ItemCategoryCreateForm")}
      {...rest}
    >
      <TextField
        label="Last activity by"
        isRequired={true}
        isReadOnly={false}
        value={lastActivityBy}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              lastActivityBy: value,
              categoryKind,
              kind,
              name,
              matchNames,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.lastActivityBy ?? value;
          }
          if (errors.lastActivityBy?.hasError) {
            runValidationTasks("lastActivityBy", value);
          }
          setLastActivityBy(value);
        }}
        onBlur={() => runValidationTasks("lastActivityBy", lastActivityBy)}
        errorMessage={errors.lastActivityBy?.errorMessage}
        hasError={errors.lastActivityBy?.hasError}
        {...getOverrideProps(overrides, "lastActivityBy")}
      ></TextField>
      <SelectField
        label="Category kind"
        placeholder="Please select an option"
        isDisabled={false}
        value={categoryKind}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              lastActivityBy,
              categoryKind: value,
              kind,
              name,
              matchNames,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.categoryKind ?? value;
          }
          if (errors.categoryKind?.hasError) {
            runValidationTasks("categoryKind", value);
          }
          setCategoryKind(value);
        }}
        onBlur={() => runValidationTasks("categoryKind", categoryKind)}
        errorMessage={errors.categoryKind?.errorMessage}
        hasError={errors.categoryKind?.hasError}
        {...getOverrideProps(overrides, "categoryKind")}
      >
        <option
          children="Category"
          value="Category"
          {...getOverrideProps(overrides, "categoryKindoption0")}
        ></option>
        <option
          children="Brand"
          value="Brand"
          {...getOverrideProps(overrides, "categoryKindoption1")}
        ></option>
        <option
          children="Color"
          value="Color"
          {...getOverrideProps(overrides, "categoryKindoption2")}
        ></option>
        <option
          children="Size"
          value="Size"
          {...getOverrideProps(overrides, "categoryKindoption3")}
        ></option>
      </SelectField>
      <TextField
        label="Kind"
        isRequired={true}
        isReadOnly={false}
        value={kind}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              lastActivityBy,
              categoryKind,
              kind: value,
              name,
              matchNames,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.kind ?? value;
          }
          if (errors.kind?.hasError) {
            runValidationTasks("kind", value);
          }
          setKind(value);
        }}
        onBlur={() => runValidationTasks("kind", kind)}
        errorMessage={errors.kind?.errorMessage}
        hasError={errors.kind?.hasError}
        {...getOverrideProps(overrides, "kind")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              lastActivityBy,
              categoryKind,
              kind,
              name: value,
              matchNames,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Match names"
        isRequired={true}
        isReadOnly={false}
        value={matchNames}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              lastActivityBy,
              categoryKind,
              kind,
              name,
              matchNames: value,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.matchNames ?? value;
          }
          if (errors.matchNames?.hasError) {
            runValidationTasks("matchNames", value);
          }
          setMatchNames(value);
        }}
        onBlur={() => runValidationTasks("matchNames", matchNames)}
        errorMessage={errors.matchNames?.errorMessage}
        hasError={errors.matchNames?.hasError}
        {...getOverrideProps(overrides, "matchNames")}
      ></TextField>
      <TextField
        label="Created at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={createdAt && convertToLocal(new Date(createdAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              lastActivityBy,
              categoryKind,
              kind,
              name,
              matchNames,
              createdAt: value,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
      ></TextField>
      <TextField
        label="Updated at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={updatedAt && convertToLocal(new Date(updatedAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              lastActivityBy,
              categoryKind,
              kind,
              name,
              matchNames,
              createdAt,
              updatedAt: value,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.updatedAt ?? value;
          }
          if (errors.updatedAt?.hasError) {
            runValidationTasks("updatedAt", value);
          }
          setUpdatedAt(value);
        }}
        onBlur={() => runValidationTasks("updatedAt", updatedAt)}
        errorMessage={errors.updatedAt?.errorMessage}
        hasError={errors.updatedAt?.hasError}
        {...getOverrideProps(overrides, "updatedAt")}
      ></TextField>
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
              lastActivityBy,
              categoryKind,
              kind,
              name,
              matchNames,
              createdAt,
              updatedAt,
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
