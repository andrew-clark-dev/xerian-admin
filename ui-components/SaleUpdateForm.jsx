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
import { getSale } from "./graphql/queries";
import { updateSale } from "./graphql/mutations";
const client = generateClient();
export default function SaleUpdateForm(props) {
  const {
    number: numberProp,
    sale: saleModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    number: "",
    lastActivityBy: "",
    customerEmail: "",
    accountNumber: "",
    status: "",
    gross: "",
    subTotal: "",
    total: "",
    tax: "",
    change: "",
    refund: "",
    accountTotal: "",
    storeTotal: "",
    transaction: "",
    refundedSale: "",
    createdAt: "",
    updatedAt: "",
  };
  const [number, setNumber] = React.useState(initialValues.number);
  const [lastActivityBy, setLastActivityBy] = React.useState(
    initialValues.lastActivityBy
  );
  const [customerEmail, setCustomerEmail] = React.useState(
    initialValues.customerEmail
  );
  const [accountNumber, setAccountNumber] = React.useState(
    initialValues.accountNumber
  );
  const [status, setStatus] = React.useState(initialValues.status);
  const [gross, setGross] = React.useState(initialValues.gross);
  const [subTotal, setSubTotal] = React.useState(initialValues.subTotal);
  const [total, setTotal] = React.useState(initialValues.total);
  const [tax, setTax] = React.useState(initialValues.tax);
  const [change, setChange] = React.useState(initialValues.change);
  const [refund, setRefund] = React.useState(initialValues.refund);
  const [accountTotal, setAccountTotal] = React.useState(
    initialValues.accountTotal
  );
  const [storeTotal, setStoreTotal] = React.useState(initialValues.storeTotal);
  const [transaction, setTransaction] = React.useState(
    initialValues.transaction
  );
  const [refundedSale, setRefundedSale] = React.useState(
    initialValues.refundedSale
  );
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [updatedAt, setUpdatedAt] = React.useState(initialValues.updatedAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = saleRecord
      ? { ...initialValues, ...saleRecord }
      : initialValues;
    setNumber(cleanValues.number);
    setLastActivityBy(cleanValues.lastActivityBy);
    setCustomerEmail(cleanValues.customerEmail);
    setAccountNumber(cleanValues.accountNumber);
    setStatus(cleanValues.status);
    setGross(cleanValues.gross);
    setSubTotal(cleanValues.subTotal);
    setTotal(cleanValues.total);
    setTax(cleanValues.tax);
    setChange(cleanValues.change);
    setRefund(cleanValues.refund);
    setAccountTotal(cleanValues.accountTotal);
    setStoreTotal(cleanValues.storeTotal);
    setTransaction(cleanValues.transaction);
    setRefundedSale(cleanValues.refundedSale);
    setCreatedAt(cleanValues.createdAt);
    setUpdatedAt(cleanValues.updatedAt);
    setErrors({});
  };
  const [saleRecord, setSaleRecord] = React.useState(saleModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = numberProp
        ? (
            await client.graphql({
              query: getSale.replaceAll("__typename", ""),
              variables: { number: numberProp },
            })
          )?.data?.getSale
        : saleModelProp;
      setSaleRecord(record);
    };
    queryData();
  }, [numberProp, saleModelProp]);
  React.useEffect(resetStateValues, [saleRecord]);
  const validations = {
    number: [{ type: "Required" }],
    lastActivityBy: [{ type: "Required" }],
    customerEmail: [],
    accountNumber: [],
    status: [],
    gross: [{ type: "Required" }],
    subTotal: [{ type: "Required" }],
    total: [{ type: "Required" }],
    tax: [{ type: "Required" }],
    change: [],
    refund: [],
    accountTotal: [{ type: "Required" }],
    storeTotal: [{ type: "Required" }],
    transaction: [{ type: "Required" }],
    refundedSale: [],
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
          number,
          lastActivityBy,
          customerEmail: customerEmail ?? null,
          accountNumber: accountNumber ?? null,
          status: status ?? null,
          gross,
          subTotal,
          total,
          tax,
          change: change ?? null,
          refund: refund ?? null,
          accountTotal,
          storeTotal,
          transaction,
          refundedSale: refundedSale ?? null,
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
            query: updateSale.replaceAll("__typename", ""),
            variables: {
              input: {
                number: saleRecord.number,
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
      {...getOverrideProps(overrides, "SaleUpdateForm")}
      {...rest}
    >
      <TextField
        label="Number"
        isRequired={true}
        isReadOnly={true}
        value={number}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              number: value,
              lastActivityBy,
              customerEmail,
              accountNumber,
              status,
              gross,
              subTotal,
              total,
              tax,
              change,
              refund,
              accountTotal,
              storeTotal,
              transaction,
              refundedSale,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.number ?? value;
          }
          if (errors.number?.hasError) {
            runValidationTasks("number", value);
          }
          setNumber(value);
        }}
        onBlur={() => runValidationTasks("number", number)}
        errorMessage={errors.number?.errorMessage}
        hasError={errors.number?.hasError}
        {...getOverrideProps(overrides, "number")}
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
              number,
              lastActivityBy: value,
              customerEmail,
              accountNumber,
              status,
              gross,
              subTotal,
              total,
              tax,
              change,
              refund,
              accountTotal,
              storeTotal,
              transaction,
              refundedSale,
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
        label="Customer email"
        isRequired={false}
        isReadOnly={false}
        value={customerEmail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              number,
              lastActivityBy,
              customerEmail: value,
              accountNumber,
              status,
              gross,
              subTotal,
              total,
              tax,
              change,
              refund,
              accountTotal,
              storeTotal,
              transaction,
              refundedSale,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.customerEmail ?? value;
          }
          if (errors.customerEmail?.hasError) {
            runValidationTasks("customerEmail", value);
          }
          setCustomerEmail(value);
        }}
        onBlur={() => runValidationTasks("customerEmail", customerEmail)}
        errorMessage={errors.customerEmail?.errorMessage}
        hasError={errors.customerEmail?.hasError}
        {...getOverrideProps(overrides, "customerEmail")}
      ></TextField>
      <TextField
        label="Account number"
        isRequired={false}
        isReadOnly={false}
        value={accountNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              number,
              lastActivityBy,
              customerEmail,
              accountNumber: value,
              status,
              gross,
              subTotal,
              total,
              tax,
              change,
              refund,
              accountTotal,
              storeTotal,
              transaction,
              refundedSale,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.accountNumber ?? value;
          }
          if (errors.accountNumber?.hasError) {
            runValidationTasks("accountNumber", value);
          }
          setAccountNumber(value);
        }}
        onBlur={() => runValidationTasks("accountNumber", accountNumber)}
        errorMessage={errors.accountNumber?.errorMessage}
        hasError={errors.accountNumber?.hasError}
        {...getOverrideProps(overrides, "accountNumber")}
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
              number,
              lastActivityBy,
              customerEmail,
              accountNumber,
              status: value,
              gross,
              subTotal,
              total,
              tax,
              change,
              refund,
              accountTotal,
              storeTotal,
              transaction,
              refundedSale,
              createdAt,
              updatedAt,
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
          children="Finalized"
          value="Finalized"
          {...getOverrideProps(overrides, "statusoption1")}
        ></option>
        <option
          children="Parked"
          value="Parked"
          {...getOverrideProps(overrides, "statusoption2")}
        ></option>
        <option
          children="Voided"
          value="Voided"
          {...getOverrideProps(overrides, "statusoption3")}
        ></option>
      </SelectField>
      <TextField
        label="Gross"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={gross}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              number,
              lastActivityBy,
              customerEmail,
              accountNumber,
              status,
              gross: value,
              subTotal,
              total,
              tax,
              change,
              refund,
              accountTotal,
              storeTotal,
              transaction,
              refundedSale,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.gross ?? value;
          }
          if (errors.gross?.hasError) {
            runValidationTasks("gross", value);
          }
          setGross(value);
        }}
        onBlur={() => runValidationTasks("gross", gross)}
        errorMessage={errors.gross?.errorMessage}
        hasError={errors.gross?.hasError}
        {...getOverrideProps(overrides, "gross")}
      ></TextField>
      <TextField
        label="Sub total"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={subTotal}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              number,
              lastActivityBy,
              customerEmail,
              accountNumber,
              status,
              gross,
              subTotal: value,
              total,
              tax,
              change,
              refund,
              accountTotal,
              storeTotal,
              transaction,
              refundedSale,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.subTotal ?? value;
          }
          if (errors.subTotal?.hasError) {
            runValidationTasks("subTotal", value);
          }
          setSubTotal(value);
        }}
        onBlur={() => runValidationTasks("subTotal", subTotal)}
        errorMessage={errors.subTotal?.errorMessage}
        hasError={errors.subTotal?.hasError}
        {...getOverrideProps(overrides, "subTotal")}
      ></TextField>
      <TextField
        label="Total"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={total}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              number,
              lastActivityBy,
              customerEmail,
              accountNumber,
              status,
              gross,
              subTotal,
              total: value,
              tax,
              change,
              refund,
              accountTotal,
              storeTotal,
              transaction,
              refundedSale,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.total ?? value;
          }
          if (errors.total?.hasError) {
            runValidationTasks("total", value);
          }
          setTotal(value);
        }}
        onBlur={() => runValidationTasks("total", total)}
        errorMessage={errors.total?.errorMessage}
        hasError={errors.total?.hasError}
        {...getOverrideProps(overrides, "total")}
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
              number,
              lastActivityBy,
              customerEmail,
              accountNumber,
              status,
              gross,
              subTotal,
              total,
              tax: value,
              change,
              refund,
              accountTotal,
              storeTotal,
              transaction,
              refundedSale,
              createdAt,
              updatedAt,
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
      <TextField
        label="Change"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={change}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              number,
              lastActivityBy,
              customerEmail,
              accountNumber,
              status,
              gross,
              subTotal,
              total,
              tax,
              change: value,
              refund,
              accountTotal,
              storeTotal,
              transaction,
              refundedSale,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.change ?? value;
          }
          if (errors.change?.hasError) {
            runValidationTasks("change", value);
          }
          setChange(value);
        }}
        onBlur={() => runValidationTasks("change", change)}
        errorMessage={errors.change?.errorMessage}
        hasError={errors.change?.hasError}
        {...getOverrideProps(overrides, "change")}
      ></TextField>
      <TextField
        label="Refund"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={refund}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              number,
              lastActivityBy,
              customerEmail,
              accountNumber,
              status,
              gross,
              subTotal,
              total,
              tax,
              change,
              refund: value,
              accountTotal,
              storeTotal,
              transaction,
              refundedSale,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.refund ?? value;
          }
          if (errors.refund?.hasError) {
            runValidationTasks("refund", value);
          }
          setRefund(value);
        }}
        onBlur={() => runValidationTasks("refund", refund)}
        errorMessage={errors.refund?.errorMessage}
        hasError={errors.refund?.hasError}
        {...getOverrideProps(overrides, "refund")}
      ></TextField>
      <TextField
        label="Account total"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={accountTotal}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              number,
              lastActivityBy,
              customerEmail,
              accountNumber,
              status,
              gross,
              subTotal,
              total,
              tax,
              change,
              refund,
              accountTotal: value,
              storeTotal,
              transaction,
              refundedSale,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.accountTotal ?? value;
          }
          if (errors.accountTotal?.hasError) {
            runValidationTasks("accountTotal", value);
          }
          setAccountTotal(value);
        }}
        onBlur={() => runValidationTasks("accountTotal", accountTotal)}
        errorMessage={errors.accountTotal?.errorMessage}
        hasError={errors.accountTotal?.hasError}
        {...getOverrideProps(overrides, "accountTotal")}
      ></TextField>
      <TextField
        label="Store total"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={storeTotal}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              number,
              lastActivityBy,
              customerEmail,
              accountNumber,
              status,
              gross,
              subTotal,
              total,
              tax,
              change,
              refund,
              accountTotal,
              storeTotal: value,
              transaction,
              refundedSale,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.storeTotal ?? value;
          }
          if (errors.storeTotal?.hasError) {
            runValidationTasks("storeTotal", value);
          }
          setStoreTotal(value);
        }}
        onBlur={() => runValidationTasks("storeTotal", storeTotal)}
        errorMessage={errors.storeTotal?.errorMessage}
        hasError={errors.storeTotal?.hasError}
        {...getOverrideProps(overrides, "storeTotal")}
      ></TextField>
      <TextField
        label="Transaction"
        isRequired={true}
        isReadOnly={false}
        value={transaction}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              number,
              lastActivityBy,
              customerEmail,
              accountNumber,
              status,
              gross,
              subTotal,
              total,
              tax,
              change,
              refund,
              accountTotal,
              storeTotal,
              transaction: value,
              refundedSale,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.transaction ?? value;
          }
          if (errors.transaction?.hasError) {
            runValidationTasks("transaction", value);
          }
          setTransaction(value);
        }}
        onBlur={() => runValidationTasks("transaction", transaction)}
        errorMessage={errors.transaction?.errorMessage}
        hasError={errors.transaction?.hasError}
        {...getOverrideProps(overrides, "transaction")}
      ></TextField>
      <TextField
        label="Refunded sale"
        isRequired={false}
        isReadOnly={false}
        value={refundedSale}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              number,
              lastActivityBy,
              customerEmail,
              accountNumber,
              status,
              gross,
              subTotal,
              total,
              tax,
              change,
              refund,
              accountTotal,
              storeTotal,
              transaction,
              refundedSale: value,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.refundedSale ?? value;
          }
          if (errors.refundedSale?.hasError) {
            runValidationTasks("refundedSale", value);
          }
          setRefundedSale(value);
        }}
        onBlur={() => runValidationTasks("refundedSale", refundedSale)}
        errorMessage={errors.refundedSale?.errorMessage}
        hasError={errors.refundedSale?.hasError}
        {...getOverrideProps(overrides, "refundedSale")}
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
              number,
              lastActivityBy,
              customerEmail,
              accountNumber,
              status,
              gross,
              subTotal,
              total,
              tax,
              change,
              refund,
              accountTotal,
              storeTotal,
              transaction,
              refundedSale,
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
              number,
              lastActivityBy,
              customerEmail,
              accountNumber,
              status,
              gross,
              subTotal,
              total,
              tax,
              change,
              refund,
              accountTotal,
              storeTotal,
              transaction,
              refundedSale,
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
          isDisabled={!(numberProp || saleModelProp)}
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
              !(numberProp || saleModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
