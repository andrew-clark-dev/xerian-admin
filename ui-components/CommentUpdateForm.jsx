/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getComment } from "./graphql/queries";
import { updateComment } from "./graphql/mutations";
const client = generateClient();
export default function CommentUpdateForm(props) {
  const {
    id: idProp,
    comment: commentModelProp,
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
    text: "",
    type: "",
    refId: "",
    refType: "",
    createdAt: "",
    updatedAt: "",
  };
  const [lastActivityBy, setLastActivityBy] = React.useState(
    initialValues.lastActivityBy
  );
  const [text, setText] = React.useState(initialValues.text);
  const [type, setType] = React.useState(initialValues.type);
  const [refId, setRefId] = React.useState(initialValues.refId);
  const [refType, setRefType] = React.useState(initialValues.refType);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [updatedAt, setUpdatedAt] = React.useState(initialValues.updatedAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = commentRecord
      ? { ...initialValues, ...commentRecord }
      : initialValues;
    setLastActivityBy(cleanValues.lastActivityBy);
    setText(cleanValues.text);
    setType(cleanValues.type);
    setRefId(cleanValues.refId);
    setRefType(cleanValues.refType);
    setCreatedAt(cleanValues.createdAt);
    setUpdatedAt(cleanValues.updatedAt);
    setErrors({});
  };
  const [commentRecord, setCommentRecord] = React.useState(commentModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getComment.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getComment
        : commentModelProp;
      setCommentRecord(record);
    };
    queryData();
  }, [idProp, commentModelProp]);
  React.useEffect(resetStateValues, [commentRecord]);
  const validations = {
    lastActivityBy: [{ type: "Required" }],
    text: [{ type: "Required" }],
    type: [],
    refId: [{ type: "Required" }],
    refType: [{ type: "Required" }],
    createdAt: [],
    updatedAt: [],
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
          text,
          type: type ?? null,
          refId,
          refType,
          createdAt: createdAt ?? null,
          updatedAt: updatedAt ?? null,
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
            query: updateComment.replaceAll("__typename", ""),
            variables: {
              input: {
                id: commentRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "CommentUpdateForm")}
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
              text,
              type,
              refId,
              refType,
              createdAt,
              updatedAt,
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
      <TextField
        label="Text"
        isRequired={true}
        isReadOnly={false}
        value={text}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              lastActivityBy,
              text: value,
              type,
              refId,
              refType,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.text ?? value;
          }
          if (errors.text?.hasError) {
            runValidationTasks("text", value);
          }
          setText(value);
        }}
        onBlur={() => runValidationTasks("text", text)}
        errorMessage={errors.text?.errorMessage}
        hasError={errors.text?.hasError}
        {...getOverrideProps(overrides, "text")}
      ></TextField>
      <TextField
        label="Type"
        isRequired={false}
        isReadOnly={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              lastActivityBy,
              text,
              type: value,
              refId,
              refType,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      ></TextField>
      <TextField
        label="Ref id"
        isRequired={true}
        isReadOnly={false}
        value={refId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              lastActivityBy,
              text,
              type,
              refId: value,
              refType,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.refId ?? value;
          }
          if (errors.refId?.hasError) {
            runValidationTasks("refId", value);
          }
          setRefId(value);
        }}
        onBlur={() => runValidationTasks("refId", refId)}
        errorMessage={errors.refId?.errorMessage}
        hasError={errors.refId?.hasError}
        {...getOverrideProps(overrides, "refId")}
      ></TextField>
      <TextField
        label="Ref type"
        isRequired={true}
        isReadOnly={false}
        value={refType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              lastActivityBy,
              text,
              type,
              refId,
              refType: value,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.refType ?? value;
          }
          if (errors.refType?.hasError) {
            runValidationTasks("refType", value);
          }
          setRefType(value);
        }}
        onBlur={() => runValidationTasks("refType", refType)}
        errorMessage={errors.refType?.errorMessage}
        hasError={errors.refType?.hasError}
        {...getOverrideProps(overrides, "refType")}
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
              text,
              type,
              refId,
              refType,
              createdAt: value,
              updatedAt,
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
              text,
              type,
              refId,
              refType,
              createdAt,
              updatedAt: value,
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
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || commentModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || commentModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
