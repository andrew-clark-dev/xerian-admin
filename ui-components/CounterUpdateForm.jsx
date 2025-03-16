/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getCounter } from "./graphql/queries";
import { updateCounter } from "./graphql/mutations";
const client = generateClient();
export default function CounterUpdateForm(props) {
  const {
    name: nameProp,
    counter: counterModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    val: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [val, setVal] = React.useState(initialValues.val);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = counterRecord
      ? { ...initialValues, ...counterRecord }
      : initialValues;
    setName(cleanValues.name);
    setVal(cleanValues.val);
    setErrors({});
  };
  const [counterRecord, setCounterRecord] = React.useState(counterModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = nameProp
        ? (
            await client.graphql({
              query: getCounter.replaceAll("__typename", ""),
              variables: { name: nameProp },
            })
          )?.data?.getCounter
        : counterModelProp;
      setCounterRecord(record);
    };
    queryData();
  }, [nameProp, counterModelProp]);
  React.useEffect(resetStateValues, [counterRecord]);
  const validations = {
    name: [{ type: "Required" }],
    val: [{ type: "Required" }],
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
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          val,
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
            query: updateCounter.replaceAll("__typename", ""),
            variables: {
              input: {
                name: counterRecord.name,
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
      {...getOverrideProps(overrides, "CounterUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={true}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              val,
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
        label="Val"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={val}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              val: value,
            };
            const result = onChange(modelFields);
            value = result?.val ?? value;
          }
          if (errors.val?.hasError) {
            runValidationTasks("val", value);
          }
          setVal(value);
        }}
        onBlur={() => runValidationTasks("val", val)}
        errorMessage={errors.val?.errorMessage}
        hasError={errors.val?.hasError}
        {...getOverrideProps(overrides, "val")}
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
          isDisabled={!(nameProp || counterModelProp)}
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
              !(nameProp || counterModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
