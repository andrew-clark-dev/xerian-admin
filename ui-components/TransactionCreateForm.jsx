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
import { createTransaction } from "./graphql/mutations";
const client = generateClient();
export default function TransactionCreateForm(props) {
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
    createdAt: "",
    updatedAt: "",
    lastActivityBy: "",
    paymentType: "",
    type: "",
    amount: "",
    tax: "",
    status: "",
    linked: "",
  };
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [updatedAt, setUpdatedAt] = React.useState(initialValues.updatedAt);
  const [lastActivityBy, setLastActivityBy] = React.useState(
    initialValues.lastActivityBy
  );
  const [paymentType, setPaymentType] = React.useState(
    initialValues.paymentType
  );
  const [type, setType] = React.useState(initialValues.type);
  const [amount, setAmount] = React.useState(initialValues.amount);
  const [tax, setTax] = React.useState(initialValues.tax);
  const [status, setStatus] = React.useState(initialValues.status);
  const [linked, setLinked] = React.useState(initialValues.linked);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setCreatedAt(initialValues.createdAt);
    setUpdatedAt(initialValues.updatedAt);
    setLastActivityBy(initialValues.lastActivityBy);
    setPaymentType(initialValues.paymentType);
    setType(initialValues.type);
    setAmount(initialValues.amount);
    setTax(initialValues.tax);
    setStatus(initialValues.status);
    setLinked(initialValues.linked);
    setErrors({});
  };
  const validations = {
    createdAt: [],
    updatedAt: [],
    lastActivityBy: [{ type: "Required" }],
    paymentType: [],
    type: [],
    amount: [{ type: "Required" }],
    tax: [{ type: "Required" }],
    status: [],
    linked: [],
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
          createdAt,
          updatedAt,
          lastActivityBy,
          paymentType,
          type,
          amount,
          tax,
          status,
          linked,
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
            query: createTransaction.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "TransactionCreateForm")}
      {...rest}
    >
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
              createdAt: value,
              updatedAt,
              lastActivityBy,
              paymentType,
              type,
              amount,
              tax,
              status,
              linked,
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
              createdAt,
              updatedAt: value,
              lastActivityBy,
              paymentType,
              type,
              amount,
              tax,
              status,
              linked,
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
        label="Last activity by"
        isRequired={true}
        isReadOnly={false}
        value={lastActivityBy}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              createdAt,
              updatedAt,
              lastActivityBy: value,
              paymentType,
              type,
              amount,
              tax,
              status,
              linked,
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
        label="Payment type"
        placeholder="Please select an option"
        isDisabled={false}
        value={paymentType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              createdAt,
              updatedAt,
              lastActivityBy,
              paymentType: value,
              type,
              amount,
              tax,
              status,
              linked,
            };
            const result = onChange(modelFields);
            value = result?.paymentType ?? value;
          }
          if (errors.paymentType?.hasError) {
            runValidationTasks("paymentType", value);
          }
          setPaymentType(value);
        }}
        onBlur={() => runValidationTasks("paymentType", paymentType)}
        errorMessage={errors.paymentType?.errorMessage}
        hasError={errors.paymentType?.hasError}
        {...getOverrideProps(overrides, "paymentType")}
      >
        <option
          children="Cash"
          value="Cash"
          {...getOverrideProps(overrides, "paymentTypeoption0")}
        ></option>
        <option
          children="Card"
          value="Card"
          {...getOverrideProps(overrides, "paymentTypeoption1")}
        ></option>
        <option
          children="Gift card"
          value="GiftCard"
          {...getOverrideProps(overrides, "paymentTypeoption2")}
        ></option>
        <option
          children="Store credit"
          value="StoreCredit"
          {...getOverrideProps(overrides, "paymentTypeoption3")}
        ></option>
        <option
          children="Other"
          value="Other"
          {...getOverrideProps(overrides, "paymentTypeoption4")}
        ></option>
      </SelectField>
      <SelectField
        label="Type"
        placeholder="Please select an option"
        isDisabled={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              createdAt,
              updatedAt,
              lastActivityBy,
              paymentType,
              type: value,
              amount,
              tax,
              status,
              linked,
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
      >
        <option
          children="Sale"
          value="Sale"
          {...getOverrideProps(overrides, "typeoption0")}
        ></option>
        <option
          children="Refund"
          value="Refund"
          {...getOverrideProps(overrides, "typeoption1")}
        ></option>
        <option
          children="Payout"
          value="Payout"
          {...getOverrideProps(overrides, "typeoption2")}
        ></option>
        <option
          children="Reversal"
          value="Reversal"
          {...getOverrideProps(overrides, "typeoption3")}
        ></option>
        <option
          children="Transfer in"
          value="TransferIn"
          {...getOverrideProps(overrides, "typeoption4")}
        ></option>
        <option
          children="Transfer out"
          value="TransferOut"
          {...getOverrideProps(overrides, "typeoption5")}
        ></option>
      </SelectField>
      <TextField
        label="Amount"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={amount}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              createdAt,
              updatedAt,
              lastActivityBy,
              paymentType,
              type,
              amount: value,
              tax,
              status,
              linked,
            };
            const result = onChange(modelFields);
            value = result?.amount ?? value;
          }
          if (errors.amount?.hasError) {
            runValidationTasks("amount", value);
          }
          setAmount(value);
        }}
        onBlur={() => runValidationTasks("amount", amount)}
        errorMessage={errors.amount?.errorMessage}
        hasError={errors.amount?.hasError}
        {...getOverrideProps(overrides, "amount")}
      ></TextField>
      <TextField
        label="Tax"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={tax}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              createdAt,
              updatedAt,
              lastActivityBy,
              paymentType,
              type,
              amount,
              tax: value,
              status,
              linked,
            };
            const result = onChange(modelFields);
            value = result?.tax ?? value;
          }
          if (errors.tax?.hasError) {
            runValidationTasks("tax", value);
          }
          setTax(value);
        }}
        onBlur={() => runValidationTasks("tax", tax)}
        errorMessage={errors.tax?.errorMessage}
        hasError={errors.tax?.hasError}
        {...getOverrideProps(overrides, "tax")}
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
              createdAt,
              updatedAt,
              lastActivityBy,
              paymentType,
              type,
              amount,
              tax,
              status: value,
              linked,
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
          children="Pending"
          value="Pending"
          {...getOverrideProps(overrides, "statusoption0")}
        ></option>
        <option
          children="Completed"
          value="Completed"
          {...getOverrideProps(overrides, "statusoption1")}
        ></option>
        <option
          children="Failed"
          value="Failed"
          {...getOverrideProps(overrides, "statusoption2")}
        ></option>
      </SelectField>
      <TextField
        label="Linked"
        isRequired={false}
        isReadOnly={false}
        value={linked}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              createdAt,
              updatedAt,
              lastActivityBy,
              paymentType,
              type,
              amount,
              tax,
              status,
              linked: value,
            };
            const result = onChange(modelFields);
            value = result?.linked ?? value;
          }
          if (errors.linked?.hasError) {
            runValidationTasks("linked", value);
          }
          setLinked(value);
        }}
        onBlur={() => runValidationTasks("linked", linked)}
        errorMessage={errors.linked?.errorMessage}
        hasError={errors.linked?.hasError}
        {...getOverrideProps(overrides, "linked")}
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
