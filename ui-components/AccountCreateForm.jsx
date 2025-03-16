/* eslint-disable */
"use client";
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createAccount } from "./graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function AccountCreateForm(props) {
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
    id: "",
    number: "",
    lastActivityBy: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    isMobile: false,
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postcode: "",
    comunicationPreferences: "",
    status: "",
    kind: "",
    defaultSplit: "",
    transactions: [],
    balance: "",
    noSales: "",
    noItems: "",
    lastActivityAt: "",
    lastItemAt: "",
    lastSettlementAt: "",
    tags: [],
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
  };
  const [id, setId] = React.useState(initialValues.id);
  const [number, setNumber] = React.useState(initialValues.number);
  const [lastActivityBy, setLastActivityBy] = React.useState(
    initialValues.lastActivityBy
  );
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [lastName, setLastName] = React.useState(initialValues.lastName);
  const [email, setEmail] = React.useState(initialValues.email);
  const [phoneNumber, setPhoneNumber] = React.useState(
    initialValues.phoneNumber
  );
  const [isMobile, setIsMobile] = React.useState(initialValues.isMobile);
  const [addressLine1, setAddressLine1] = React.useState(
    initialValues.addressLine1
  );
  const [addressLine2, setAddressLine2] = React.useState(
    initialValues.addressLine2
  );
  const [city, setCity] = React.useState(initialValues.city);
  const [state, setState] = React.useState(initialValues.state);
  const [postcode, setPostcode] = React.useState(initialValues.postcode);
  const [comunicationPreferences, setComunicationPreferences] = React.useState(
    initialValues.comunicationPreferences
  );
  const [status, setStatus] = React.useState(initialValues.status);
  const [kind, setKind] = React.useState(initialValues.kind);
  const [defaultSplit, setDefaultSplit] = React.useState(
    initialValues.defaultSplit
  );
  const [transactions, setTransactions] = React.useState(
    initialValues.transactions
  );
  const [balance, setBalance] = React.useState(initialValues.balance);
  const [noSales, setNoSales] = React.useState(initialValues.noSales);
  const [noItems, setNoItems] = React.useState(initialValues.noItems);
  const [lastActivityAt, setLastActivityAt] = React.useState(
    initialValues.lastActivityAt
  );
  const [lastItemAt, setLastItemAt] = React.useState(initialValues.lastItemAt);
  const [lastSettlementAt, setLastSettlementAt] = React.useState(
    initialValues.lastSettlementAt
  );
  const [tags, setTags] = React.useState(initialValues.tags);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [updatedAt, setUpdatedAt] = React.useState(initialValues.updatedAt);
  const [deletedAt, setDeletedAt] = React.useState(initialValues.deletedAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setId(initialValues.id);
    setNumber(initialValues.number);
    setLastActivityBy(initialValues.lastActivityBy);
    setFirstName(initialValues.firstName);
    setLastName(initialValues.lastName);
    setEmail(initialValues.email);
    setPhoneNumber(initialValues.phoneNumber);
    setIsMobile(initialValues.isMobile);
    setAddressLine1(initialValues.addressLine1);
    setAddressLine2(initialValues.addressLine2);
    setCity(initialValues.city);
    setState(initialValues.state);
    setPostcode(initialValues.postcode);
    setComunicationPreferences(initialValues.comunicationPreferences);
    setStatus(initialValues.status);
    setKind(initialValues.kind);
    setDefaultSplit(initialValues.defaultSplit);
    setTransactions(initialValues.transactions);
    setCurrentTransactionsValue("");
    setBalance(initialValues.balance);
    setNoSales(initialValues.noSales);
    setNoItems(initialValues.noItems);
    setLastActivityAt(initialValues.lastActivityAt);
    setLastItemAt(initialValues.lastItemAt);
    setLastSettlementAt(initialValues.lastSettlementAt);
    setTags(initialValues.tags);
    setCurrentTagsValue("");
    setCreatedAt(initialValues.createdAt);
    setUpdatedAt(initialValues.updatedAt);
    setDeletedAt(initialValues.deletedAt);
    setErrors({});
  };
  const [currentTransactionsValue, setCurrentTransactionsValue] =
    React.useState("");
  const transactionsRef = React.createRef();
  const [currentTagsValue, setCurrentTagsValue] = React.useState("");
  const tagsRef = React.createRef();
  const validations = {
    id: [],
    number: [{ type: "Required" }],
    lastActivityBy: [{ type: "Required" }],
    firstName: [],
    lastName: [],
    email: [],
    phoneNumber: [],
    isMobile: [],
    addressLine1: [],
    addressLine2: [],
    city: [],
    state: [],
    postcode: [],
    comunicationPreferences: [],
    status: [],
    kind: [],
    defaultSplit: [],
    transactions: [],
    balance: [],
    noSales: [],
    noItems: [],
    lastActivityAt: [],
    lastItemAt: [],
    lastSettlementAt: [],
    tags: [],
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
          id,
          number,
          lastActivityBy,
          firstName,
          lastName,
          email,
          phoneNumber,
          isMobile,
          addressLine1,
          addressLine2,
          city,
          state,
          postcode,
          comunicationPreferences,
          status,
          kind,
          defaultSplit,
          transactions,
          balance,
          noSales,
          noItems,
          lastActivityAt,
          lastItemAt,
          lastSettlementAt,
          tags,
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
            query: createAccount.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "AccountCreateForm")}
      {...rest}
    >
      <TextField
        label="Id"
        isRequired={false}
        isReadOnly={false}
        value={id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id: value,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.id ?? value;
          }
          if (errors.id?.hasError) {
            runValidationTasks("id", value);
          }
          setId(value);
        }}
        onBlur={() => runValidationTasks("id", id)}
        errorMessage={errors.id?.errorMessage}
        hasError={errors.id?.hasError}
        {...getOverrideProps(overrides, "id")}
      ></TextField>
      <TextField
        label="Number"
        isRequired={true}
        isReadOnly={false}
        value={number}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              number: value,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
              createdAt,
              updatedAt,
              deletedAt,
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
              id,
              number,
              lastActivityBy: value,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
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
      <TextField
        label="First name"
        isRequired={false}
        isReadOnly={false}
        value={firstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              number,
              lastActivityBy,
              firstName: value,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.firstName ?? value;
          }
          if (errors.firstName?.hasError) {
            runValidationTasks("firstName", value);
          }
          setFirstName(value);
        }}
        onBlur={() => runValidationTasks("firstName", firstName)}
        errorMessage={errors.firstName?.errorMessage}
        hasError={errors.firstName?.hasError}
        {...getOverrideProps(overrides, "firstName")}
      ></TextField>
      <TextField
        label="Last name"
        isRequired={false}
        isReadOnly={false}
        value={lastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              number,
              lastActivityBy,
              firstName,
              lastName: value,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.lastName ?? value;
          }
          if (errors.lastName?.hasError) {
            runValidationTasks("lastName", value);
          }
          setLastName(value);
        }}
        onBlur={() => runValidationTasks("lastName", lastName)}
        errorMessage={errors.lastName?.errorMessage}
        hasError={errors.lastName?.hasError}
        {...getOverrideProps(overrides, "lastName")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email: value,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
              createdAt,
              updatedAt,
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
        label="Phone number"
        isRequired={false}
        isReadOnly={false}
        value={phoneNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber: value,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
              createdAt,
              updatedAt,
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
      <SwitchField
        label="Is mobile"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isMobile}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile: value,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.isMobile ?? value;
          }
          if (errors.isMobile?.hasError) {
            runValidationTasks("isMobile", value);
          }
          setIsMobile(value);
        }}
        onBlur={() => runValidationTasks("isMobile", isMobile)}
        errorMessage={errors.isMobile?.errorMessage}
        hasError={errors.isMobile?.hasError}
        {...getOverrideProps(overrides, "isMobile")}
      ></SwitchField>
      <TextField
        label="Address line1"
        isRequired={false}
        isReadOnly={false}
        value={addressLine1}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1: value,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.addressLine1 ?? value;
          }
          if (errors.addressLine1?.hasError) {
            runValidationTasks("addressLine1", value);
          }
          setAddressLine1(value);
        }}
        onBlur={() => runValidationTasks("addressLine1", addressLine1)}
        errorMessage={errors.addressLine1?.errorMessage}
        hasError={errors.addressLine1?.hasError}
        {...getOverrideProps(overrides, "addressLine1")}
      ></TextField>
      <TextField
        label="Address line2"
        isRequired={false}
        isReadOnly={false}
        value={addressLine2}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2: value,
              city,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.addressLine2 ?? value;
          }
          if (errors.addressLine2?.hasError) {
            runValidationTasks("addressLine2", value);
          }
          setAddressLine2(value);
        }}
        onBlur={() => runValidationTasks("addressLine2", addressLine2)}
        errorMessage={errors.addressLine2?.errorMessage}
        hasError={errors.addressLine2?.hasError}
        {...getOverrideProps(overrides, "addressLine2")}
      ></TextField>
      <TextField
        label="City"
        isRequired={false}
        isReadOnly={false}
        value={city}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city: value,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.city ?? value;
          }
          if (errors.city?.hasError) {
            runValidationTasks("city", value);
          }
          setCity(value);
        }}
        onBlur={() => runValidationTasks("city", city)}
        errorMessage={errors.city?.errorMessage}
        hasError={errors.city?.hasError}
        {...getOverrideProps(overrides, "city")}
      ></TextField>
      <TextField
        label="State"
        isRequired={false}
        isReadOnly={false}
        value={state}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state: value,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.state ?? value;
          }
          if (errors.state?.hasError) {
            runValidationTasks("state", value);
          }
          setState(value);
        }}
        onBlur={() => runValidationTasks("state", state)}
        errorMessage={errors.state?.errorMessage}
        hasError={errors.state?.hasError}
        {...getOverrideProps(overrides, "state")}
      ></TextField>
      <TextField
        label="Postcode"
        isRequired={false}
        isReadOnly={false}
        value={postcode}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode: value,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.postcode ?? value;
          }
          if (errors.postcode?.hasError) {
            runValidationTasks("postcode", value);
          }
          setPostcode(value);
        }}
        onBlur={() => runValidationTasks("postcode", postcode)}
        errorMessage={errors.postcode?.errorMessage}
        hasError={errors.postcode?.hasError}
        {...getOverrideProps(overrides, "postcode")}
      ></TextField>
      <SelectField
        label="Comunication preferences"
        placeholder="Please select an option"
        isDisabled={false}
        value={comunicationPreferences}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences: value,
              status,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.comunicationPreferences ?? value;
          }
          if (errors.comunicationPreferences?.hasError) {
            runValidationTasks("comunicationPreferences", value);
          }
          setComunicationPreferences(value);
        }}
        onBlur={() =>
          runValidationTasks("comunicationPreferences", comunicationPreferences)
        }
        errorMessage={errors.comunicationPreferences?.errorMessage}
        hasError={errors.comunicationPreferences?.hasError}
        {...getOverrideProps(overrides, "comunicationPreferences")}
      >
        <option
          children="Text message"
          value="TextMessage"
          {...getOverrideProps(overrides, "comunicationPreferencesoption0")}
        ></option>
        <option
          children="Email"
          value="Email"
          {...getOverrideProps(overrides, "comunicationPreferencesoption1")}
        ></option>
        <option
          children="Whatsapp"
          value="Whatsapp"
          {...getOverrideProps(overrides, "comunicationPreferencesoption2")}
        ></option>
        <option
          children="None"
          value="None"
          {...getOverrideProps(overrides, "comunicationPreferencesoption3")}
        ></option>
      </SelectField>
      <SelectField
        label="Status"
        placeholder="Please select an option"
        isDisabled={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences,
              status: value,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
              createdAt,
              updatedAt,
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
      </SelectField>
      <SelectField
        label="Kind"
        placeholder="Please select an option"
        isDisabled={false}
        value={kind}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind: value,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
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
      >
        <option
          children="Standard"
          value="Standard"
          {...getOverrideProps(overrides, "kindoption0")}
        ></option>
        <option
          children="Vip"
          value="VIP"
          {...getOverrideProps(overrides, "kindoption1")}
        ></option>
        <option
          children="Vender"
          value="Vender"
          {...getOverrideProps(overrides, "kindoption2")}
        ></option>
        <option
          children="Employee"
          value="Employee"
          {...getOverrideProps(overrides, "kindoption3")}
        ></option>
        <option
          children="Customer"
          value="Customer"
          {...getOverrideProps(overrides, "kindoption4")}
        ></option>
        <option
          children="Owner"
          value="Owner"
          {...getOverrideProps(overrides, "kindoption5")}
        ></option>
      </SelectField>
      <TextField
        label="Default split"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={defaultSplit}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              id,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit: value,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.defaultSplit ?? value;
          }
          if (errors.defaultSplit?.hasError) {
            runValidationTasks("defaultSplit", value);
          }
          setDefaultSplit(value);
        }}
        onBlur={() => runValidationTasks("defaultSplit", defaultSplit)}
        errorMessage={errors.defaultSplit?.errorMessage}
        hasError={errors.defaultSplit?.hasError}
        {...getOverrideProps(overrides, "defaultSplit")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              id,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions: values,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            values = result?.transactions ?? values;
          }
          setTransactions(values);
          setCurrentTransactionsValue("");
        }}
        currentFieldValue={currentTransactionsValue}
        label={"Transactions"}
        items={transactions}
        hasError={errors?.transactions?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("transactions", currentTransactionsValue)
        }
        errorMessage={errors?.transactions?.errorMessage}
        setFieldValue={setCurrentTransactionsValue}
        inputFieldRef={transactionsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Transactions"
          isRequired={false}
          isReadOnly={false}
          value={currentTransactionsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.transactions?.hasError) {
              runValidationTasks("transactions", value);
            }
            setCurrentTransactionsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("transactions", currentTransactionsValue)
          }
          errorMessage={errors.transactions?.errorMessage}
          hasError={errors.transactions?.hasError}
          ref={transactionsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "transactions")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Balance"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={balance}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              id,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions,
              balance: value,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.balance ?? value;
          }
          if (errors.balance?.hasError) {
            runValidationTasks("balance", value);
          }
          setBalance(value);
        }}
        onBlur={() => runValidationTasks("balance", balance)}
        errorMessage={errors.balance?.errorMessage}
        hasError={errors.balance?.hasError}
        {...getOverrideProps(overrides, "balance")}
      ></TextField>
      <TextField
        label="No sales"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={noSales}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              id,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales: value,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.noSales ?? value;
          }
          if (errors.noSales?.hasError) {
            runValidationTasks("noSales", value);
          }
          setNoSales(value);
        }}
        onBlur={() => runValidationTasks("noSales", noSales)}
        errorMessage={errors.noSales?.errorMessage}
        hasError={errors.noSales?.hasError}
        {...getOverrideProps(overrides, "noSales")}
      ></TextField>
      <TextField
        label="No items"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={noItems}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              id,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems: value,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.noItems ?? value;
          }
          if (errors.noItems?.hasError) {
            runValidationTasks("noItems", value);
          }
          setNoItems(value);
        }}
        onBlur={() => runValidationTasks("noItems", noItems)}
        errorMessage={errors.noItems?.errorMessage}
        hasError={errors.noItems?.hasError}
        {...getOverrideProps(overrides, "noItems")}
      ></TextField>
      <TextField
        label="Last activity at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={lastActivityAt && convertToLocal(new Date(lastActivityAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              id,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt: value,
              lastItemAt,
              lastSettlementAt,
              tags,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.lastActivityAt ?? value;
          }
          if (errors.lastActivityAt?.hasError) {
            runValidationTasks("lastActivityAt", value);
          }
          setLastActivityAt(value);
        }}
        onBlur={() => runValidationTasks("lastActivityAt", lastActivityAt)}
        errorMessage={errors.lastActivityAt?.errorMessage}
        hasError={errors.lastActivityAt?.hasError}
        {...getOverrideProps(overrides, "lastActivityAt")}
      ></TextField>
      <TextField
        label="Last item at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={lastItemAt && convertToLocal(new Date(lastItemAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              id,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt: value,
              lastSettlementAt,
              tags,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.lastItemAt ?? value;
          }
          if (errors.lastItemAt?.hasError) {
            runValidationTasks("lastItemAt", value);
          }
          setLastItemAt(value);
        }}
        onBlur={() => runValidationTasks("lastItemAt", lastItemAt)}
        errorMessage={errors.lastItemAt?.errorMessage}
        hasError={errors.lastItemAt?.hasError}
        {...getOverrideProps(overrides, "lastItemAt")}
      ></TextField>
      <TextField
        label="Last settlement at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={lastSettlementAt && convertToLocal(new Date(lastSettlementAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              id,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt: value,
              tags,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.lastSettlementAt ?? value;
          }
          if (errors.lastSettlementAt?.hasError) {
            runValidationTasks("lastSettlementAt", value);
          }
          setLastSettlementAt(value);
        }}
        onBlur={() => runValidationTasks("lastSettlementAt", lastSettlementAt)}
        errorMessage={errors.lastSettlementAt?.errorMessage}
        hasError={errors.lastSettlementAt?.hasError}
        {...getOverrideProps(overrides, "lastSettlementAt")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              id,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags: values,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            values = result?.tags ?? values;
          }
          setTags(values);
          setCurrentTagsValue("");
        }}
        currentFieldValue={currentTagsValue}
        label={"Tags"}
        items={tags}
        hasError={errors?.tags?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("tags", currentTagsValue)
        }
        errorMessage={errors?.tags?.errorMessage}
        setFieldValue={setCurrentTagsValue}
        inputFieldRef={tagsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Tags"
          isRequired={false}
          isReadOnly={false}
          value={currentTagsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.tags?.hasError) {
              runValidationTasks("tags", value);
            }
            setCurrentTagsValue(value);
          }}
          onBlur={() => runValidationTasks("tags", currentTagsValue)}
          errorMessage={errors.tags?.errorMessage}
          hasError={errors.tags?.hasError}
          ref={tagsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "tags")}
        ></TextField>
      </ArrayField>
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
              id,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
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
              id,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
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
              id,
              number,
              lastActivityBy,
              firstName,
              lastName,
              email,
              phoneNumber,
              isMobile,
              addressLine1,
              addressLine2,
              city,
              state,
              postcode,
              comunicationPreferences,
              status,
              kind,
              defaultSplit,
              transactions,
              balance,
              noSales,
              noItems,
              lastActivityAt,
              lastItemAt,
              lastSettlementAt,
              tags,
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
