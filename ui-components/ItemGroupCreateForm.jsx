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
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createItemGroup } from "./graphql/mutations";
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
export default function ItemGroupCreateForm(props) {
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
    quantity: "",
    statuses: [],
  };
  const [quantity, setQuantity] = React.useState(initialValues.quantity);
  const [statuses, setStatuses] = React.useState(initialValues.statuses);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setQuantity(initialValues.quantity);
    setStatuses(initialValues.statuses);
    setCurrentStatusesValue("");
    setErrors({});
  };
  const [currentStatusesValue, setCurrentStatusesValue] = React.useState("");
  const statusesRef = React.createRef();
  const getDisplayValue = {
    statuses: (r) => {
      const enumDisplayValueMap = {
        Created: "Created",
        Tagged: "Tagged",
        Active: "Active",
        Sold: "Sold",
        ToDonate: "To donate",
        Donated: "Donated",
        Parked: "Parked",
        Returned: "Returned",
        Expired: "Expired",
        Lost: "Lost",
        Stolen: "Stolen",
        Multi: "Multi",
        Unknown: "Unknown",
      };
      return enumDisplayValueMap[r];
    },
  };
  const validations = {
    quantity: [{ type: "Required" }],
    statuses: [],
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
          quantity,
          statuses,
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
            query: createItemGroup.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "ItemGroupCreateForm")}
      {...rest}
    >
      <TextField
        label="Quantity"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={quantity}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              quantity: value,
              statuses,
            };
            const result = onChange(modelFields);
            value = result?.quantity ?? value;
          }
          if (errors.quantity?.hasError) {
            runValidationTasks("quantity", value);
          }
          setQuantity(value);
        }}
        onBlur={() => runValidationTasks("quantity", quantity)}
        errorMessage={errors.quantity?.errorMessage}
        hasError={errors.quantity?.hasError}
        {...getOverrideProps(overrides, "quantity")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              quantity,
              statuses: values,
            };
            const result = onChange(modelFields);
            values = result?.statuses ?? values;
          }
          setStatuses(values);
          setCurrentStatusesValue("");
        }}
        currentFieldValue={currentStatusesValue}
        label={"Statuses"}
        items={statuses}
        hasError={errors?.statuses?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("statuses", currentStatusesValue)
        }
        errorMessage={errors?.statuses?.errorMessage}
        getBadgeText={getDisplayValue.statuses}
        setFieldValue={setCurrentStatusesValue}
        inputFieldRef={statusesRef}
        defaultFieldValue={""}
      >
        <SelectField
          label="Statuses"
          placeholder="Please select an option"
          isDisabled={false}
          value={currentStatusesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.statuses?.hasError) {
              runValidationTasks("statuses", value);
            }
            setCurrentStatusesValue(value);
          }}
          onBlur={() => runValidationTasks("statuses", currentStatusesValue)}
          errorMessage={errors.statuses?.errorMessage}
          hasError={errors.statuses?.hasError}
          ref={statusesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "statuses")}
        >
          <option
            children="Created"
            value="Created"
            {...getOverrideProps(overrides, "statusesoption0")}
          ></option>
          <option
            children="Tagged"
            value="Tagged"
            {...getOverrideProps(overrides, "statusesoption1")}
          ></option>
          <option
            children="Active"
            value="Active"
            {...getOverrideProps(overrides, "statusesoption2")}
          ></option>
          <option
            children="Sold"
            value="Sold"
            {...getOverrideProps(overrides, "statusesoption3")}
          ></option>
          <option
            children="To donate"
            value="ToDonate"
            {...getOverrideProps(overrides, "statusesoption4")}
          ></option>
          <option
            children="Donated"
            value="Donated"
            {...getOverrideProps(overrides, "statusesoption5")}
          ></option>
          <option
            children="Parked"
            value="Parked"
            {...getOverrideProps(overrides, "statusesoption6")}
          ></option>
          <option
            children="Returned"
            value="Returned"
            {...getOverrideProps(overrides, "statusesoption7")}
          ></option>
          <option
            children="Expired"
            value="Expired"
            {...getOverrideProps(overrides, "statusesoption8")}
          ></option>
          <option
            children="Lost"
            value="Lost"
            {...getOverrideProps(overrides, "statusesoption9")}
          ></option>
          <option
            children="Stolen"
            value="Stolen"
            {...getOverrideProps(overrides, "statusesoption10")}
          ></option>
          <option
            children="Multi"
            value="Multi"
            {...getOverrideProps(overrides, "statusesoption11")}
          ></option>
          <option
            children="Unknown"
            value="Unknown"
            {...getOverrideProps(overrides, "statusesoption12")}
          ></option>
        </SelectField>
      </ArrayField>
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
