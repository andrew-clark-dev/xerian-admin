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
import { createItem } from "./graphql/mutations";
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
export default function ItemCreateForm(props) {
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
    sku: "",
    lastActivityBy: "",
    title: "",
    category: "",
    brand: "",
    color: "",
    size: "",
    description: "",
    details: "",
    images: [],
    condition: "",
    split: "",
    price: "",
    status: "",
    sales: [],
    printedAt: "",
    lastSoldAt: "",
    lastViewedAt: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
  };
  const [id, setId] = React.useState(initialValues.id);
  const [sku, setSku] = React.useState(initialValues.sku);
  const [lastActivityBy, setLastActivityBy] = React.useState(
    initialValues.lastActivityBy
  );
  const [title, setTitle] = React.useState(initialValues.title);
  const [category, setCategory] = React.useState(initialValues.category);
  const [brand, setBrand] = React.useState(initialValues.brand);
  const [color, setColor] = React.useState(initialValues.color);
  const [size, setSize] = React.useState(initialValues.size);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [details, setDetails] = React.useState(initialValues.details);
  const [images, setImages] = React.useState(initialValues.images);
  const [condition, setCondition] = React.useState(initialValues.condition);
  const [split, setSplit] = React.useState(initialValues.split);
  const [price, setPrice] = React.useState(initialValues.price);
  const [status, setStatus] = React.useState(initialValues.status);
  const [sales, setSales] = React.useState(initialValues.sales);
  const [printedAt, setPrintedAt] = React.useState(initialValues.printedAt);
  const [lastSoldAt, setLastSoldAt] = React.useState(initialValues.lastSoldAt);
  const [lastViewedAt, setLastViewedAt] = React.useState(
    initialValues.lastViewedAt
  );
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [updatedAt, setUpdatedAt] = React.useState(initialValues.updatedAt);
  const [deletedAt, setDeletedAt] = React.useState(initialValues.deletedAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setId(initialValues.id);
    setSku(initialValues.sku);
    setLastActivityBy(initialValues.lastActivityBy);
    setTitle(initialValues.title);
    setCategory(initialValues.category);
    setBrand(initialValues.brand);
    setColor(initialValues.color);
    setSize(initialValues.size);
    setDescription(initialValues.description);
    setDetails(initialValues.details);
    setImages(initialValues.images);
    setCurrentImagesValue("");
    setCondition(initialValues.condition);
    setSplit(initialValues.split);
    setPrice(initialValues.price);
    setStatus(initialValues.status);
    setSales(initialValues.sales);
    setCurrentSalesValue("");
    setPrintedAt(initialValues.printedAt);
    setLastSoldAt(initialValues.lastSoldAt);
    setLastViewedAt(initialValues.lastViewedAt);
    setCreatedAt(initialValues.createdAt);
    setUpdatedAt(initialValues.updatedAt);
    setDeletedAt(initialValues.deletedAt);
    setErrors({});
  };
  const [currentImagesValue, setCurrentImagesValue] = React.useState("");
  const imagesRef = React.createRef();
  const [currentSalesValue, setCurrentSalesValue] = React.useState("");
  const salesRef = React.createRef();
  const validations = {
    id: [],
    sku: [{ type: "Required" }],
    lastActivityBy: [{ type: "Required" }],
    title: [],
    category: [],
    brand: [],
    color: [],
    size: [],
    description: [],
    details: [],
    images: [{ type: "URL" }],
    condition: [],
    split: [],
    price: [],
    status: [],
    sales: [],
    printedAt: [],
    lastSoldAt: [],
    lastViewedAt: [],
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
          sku,
          lastActivityBy,
          title,
          category,
          brand,
          color,
          size,
          description,
          details,
          images,
          condition,
          split,
          price,
          status,
          sales,
          printedAt,
          lastSoldAt,
          lastViewedAt,
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
            query: createItem.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "ItemCreateForm")}
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
              sku,
              lastActivityBy,
              title,
              category,
              brand,
              color,
              size,
              description,
              details,
              images,
              condition,
              split,
              price,
              status,
              sales,
              printedAt,
              lastSoldAt,
              lastViewedAt,
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
        label="Sku"
        isRequired={true}
        isReadOnly={false}
        value={sku}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              sku: value,
              lastActivityBy,
              title,
              category,
              brand,
              color,
              size,
              description,
              details,
              images,
              condition,
              split,
              price,
              status,
              sales,
              printedAt,
              lastSoldAt,
              lastViewedAt,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.sku ?? value;
          }
          if (errors.sku?.hasError) {
            runValidationTasks("sku", value);
          }
          setSku(value);
        }}
        onBlur={() => runValidationTasks("sku", sku)}
        errorMessage={errors.sku?.errorMessage}
        hasError={errors.sku?.hasError}
        {...getOverrideProps(overrides, "sku")}
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
              sku,
              lastActivityBy: value,
              title,
              category,
              brand,
              color,
              size,
              description,
              details,
              images,
              condition,
              split,
              price,
              status,
              sales,
              printedAt,
              lastSoldAt,
              lastViewedAt,
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
        label="Title"
        isRequired={false}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              sku,
              lastActivityBy,
              title: value,
              category,
              brand,
              color,
              size,
              description,
              details,
              images,
              condition,
              split,
              price,
              status,
              sales,
              printedAt,
              lastSoldAt,
              lastViewedAt,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Category"
        isRequired={false}
        isReadOnly={false}
        value={category}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              sku,
              lastActivityBy,
              title,
              category: value,
              brand,
              color,
              size,
              description,
              details,
              images,
              condition,
              split,
              price,
              status,
              sales,
              printedAt,
              lastSoldAt,
              lastViewedAt,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.category ?? value;
          }
          if (errors.category?.hasError) {
            runValidationTasks("category", value);
          }
          setCategory(value);
        }}
        onBlur={() => runValidationTasks("category", category)}
        errorMessage={errors.category?.errorMessage}
        hasError={errors.category?.hasError}
        {...getOverrideProps(overrides, "category")}
      ></TextField>
      <TextField
        label="Brand"
        isRequired={false}
        isReadOnly={false}
        value={brand}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              sku,
              lastActivityBy,
              title,
              category,
              brand: value,
              color,
              size,
              description,
              details,
              images,
              condition,
              split,
              price,
              status,
              sales,
              printedAt,
              lastSoldAt,
              lastViewedAt,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.brand ?? value;
          }
          if (errors.brand?.hasError) {
            runValidationTasks("brand", value);
          }
          setBrand(value);
        }}
        onBlur={() => runValidationTasks("brand", brand)}
        errorMessage={errors.brand?.errorMessage}
        hasError={errors.brand?.hasError}
        {...getOverrideProps(overrides, "brand")}
      ></TextField>
      <TextField
        label="Color"
        isRequired={false}
        isReadOnly={false}
        value={color}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              sku,
              lastActivityBy,
              title,
              category,
              brand,
              color: value,
              size,
              description,
              details,
              images,
              condition,
              split,
              price,
              status,
              sales,
              printedAt,
              lastSoldAt,
              lastViewedAt,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.color ?? value;
          }
          if (errors.color?.hasError) {
            runValidationTasks("color", value);
          }
          setColor(value);
        }}
        onBlur={() => runValidationTasks("color", color)}
        errorMessage={errors.color?.errorMessage}
        hasError={errors.color?.hasError}
        {...getOverrideProps(overrides, "color")}
      ></TextField>
      <TextField
        label="Size"
        isRequired={false}
        isReadOnly={false}
        value={size}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              sku,
              lastActivityBy,
              title,
              category,
              brand,
              color,
              size: value,
              description,
              details,
              images,
              condition,
              split,
              price,
              status,
              sales,
              printedAt,
              lastSoldAt,
              lastViewedAt,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.size ?? value;
          }
          if (errors.size?.hasError) {
            runValidationTasks("size", value);
          }
          setSize(value);
        }}
        onBlur={() => runValidationTasks("size", size)}
        errorMessage={errors.size?.errorMessage}
        hasError={errors.size?.hasError}
        {...getOverrideProps(overrides, "size")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              sku,
              lastActivityBy,
              title,
              category,
              brand,
              color,
              size,
              description: value,
              details,
              images,
              condition,
              split,
              price,
              status,
              sales,
              printedAt,
              lastSoldAt,
              lastViewedAt,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Details"
        isRequired={false}
        isReadOnly={false}
        value={details}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              sku,
              lastActivityBy,
              title,
              category,
              brand,
              color,
              size,
              description,
              details: value,
              images,
              condition,
              split,
              price,
              status,
              sales,
              printedAt,
              lastSoldAt,
              lastViewedAt,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.details ?? value;
          }
          if (errors.details?.hasError) {
            runValidationTasks("details", value);
          }
          setDetails(value);
        }}
        onBlur={() => runValidationTasks("details", details)}
        errorMessage={errors.details?.errorMessage}
        hasError={errors.details?.hasError}
        {...getOverrideProps(overrides, "details")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              id,
              sku,
              lastActivityBy,
              title,
              category,
              brand,
              color,
              size,
              description,
              details,
              images: values,
              condition,
              split,
              price,
              status,
              sales,
              printedAt,
              lastSoldAt,
              lastViewedAt,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            values = result?.images ?? values;
          }
          setImages(values);
          setCurrentImagesValue("");
        }}
        currentFieldValue={currentImagesValue}
        label={"Images"}
        items={images}
        hasError={errors?.images?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("images", currentImagesValue)
        }
        errorMessage={errors?.images?.errorMessage}
        setFieldValue={setCurrentImagesValue}
        inputFieldRef={imagesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Images"
          isRequired={false}
          isReadOnly={false}
          value={currentImagesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.images?.hasError) {
              runValidationTasks("images", value);
            }
            setCurrentImagesValue(value);
          }}
          onBlur={() => runValidationTasks("images", currentImagesValue)}
          errorMessage={errors.images?.errorMessage}
          hasError={errors.images?.hasError}
          ref={imagesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "images")}
        ></TextField>
      </ArrayField>
      <SelectField
        label="Condition"
        placeholder="Please select an option"
        isDisabled={false}
        value={condition}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              sku,
              lastActivityBy,
              title,
              category,
              brand,
              color,
              size,
              description,
              details,
              images,
              condition: value,
              split,
              price,
              status,
              sales,
              printedAt,
              lastSoldAt,
              lastViewedAt,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.condition ?? value;
          }
          if (errors.condition?.hasError) {
            runValidationTasks("condition", value);
          }
          setCondition(value);
        }}
        onBlur={() => runValidationTasks("condition", condition)}
        errorMessage={errors.condition?.errorMessage}
        hasError={errors.condition?.hasError}
        {...getOverrideProps(overrides, "condition")}
      >
        <option
          children="As new"
          value="AsNew"
          {...getOverrideProps(overrides, "conditionoption0")}
        ></option>
        <option
          children="Good"
          value="Good"
          {...getOverrideProps(overrides, "conditionoption1")}
        ></option>
        <option
          children="Marked"
          value="Marked"
          {...getOverrideProps(overrides, "conditionoption2")}
        ></option>
        <option
          children="Damaged"
          value="Damaged"
          {...getOverrideProps(overrides, "conditionoption3")}
        ></option>
        <option
          children="Unknown"
          value="Unknown"
          {...getOverrideProps(overrides, "conditionoption4")}
        ></option>
        <option
          children="Not specified"
          value="NotSpecified"
          {...getOverrideProps(overrides, "conditionoption5")}
        ></option>
      </SelectField>
      <TextField
        label="Split"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={split}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              id,
              sku,
              lastActivityBy,
              title,
              category,
              brand,
              color,
              size,
              description,
              details,
              images,
              condition,
              split: value,
              price,
              status,
              sales,
              printedAt,
              lastSoldAt,
              lastViewedAt,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.split ?? value;
          }
          if (errors.split?.hasError) {
            runValidationTasks("split", value);
          }
          setSplit(value);
        }}
        onBlur={() => runValidationTasks("split", split)}
        errorMessage={errors.split?.errorMessage}
        hasError={errors.split?.hasError}
        {...getOverrideProps(overrides, "split")}
      ></TextField>
      <TextField
        label="Price"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={price}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              id,
              sku,
              lastActivityBy,
              title,
              category,
              brand,
              color,
              size,
              description,
              details,
              images,
              condition,
              split,
              price: value,
              status,
              sales,
              printedAt,
              lastSoldAt,
              lastViewedAt,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.price ?? value;
          }
          if (errors.price?.hasError) {
            runValidationTasks("price", value);
          }
          setPrice(value);
        }}
        onBlur={() => runValidationTasks("price", price)}
        errorMessage={errors.price?.errorMessage}
        hasError={errors.price?.hasError}
        {...getOverrideProps(overrides, "price")}
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
              id,
              sku,
              lastActivityBy,
              title,
              category,
              brand,
              color,
              size,
              description,
              details,
              images,
              condition,
              split,
              price,
              status: value,
              sales,
              printedAt,
              lastSoldAt,
              lastViewedAt,
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
          children="Created"
          value="Created"
          {...getOverrideProps(overrides, "statusoption0")}
        ></option>
        <option
          children="Tagged"
          value="Tagged"
          {...getOverrideProps(overrides, "statusoption1")}
        ></option>
        <option
          children="Active"
          value="Active"
          {...getOverrideProps(overrides, "statusoption2")}
        ></option>
        <option
          children="Sold"
          value="Sold"
          {...getOverrideProps(overrides, "statusoption3")}
        ></option>
        <option
          children="To donate"
          value="ToDonate"
          {...getOverrideProps(overrides, "statusoption4")}
        ></option>
        <option
          children="Donated"
          value="Donated"
          {...getOverrideProps(overrides, "statusoption5")}
        ></option>
        <option
          children="Parked"
          value="Parked"
          {...getOverrideProps(overrides, "statusoption6")}
        ></option>
        <option
          children="Returned"
          value="Returned"
          {...getOverrideProps(overrides, "statusoption7")}
        ></option>
        <option
          children="Expired"
          value="Expired"
          {...getOverrideProps(overrides, "statusoption8")}
        ></option>
        <option
          children="Lost"
          value="Lost"
          {...getOverrideProps(overrides, "statusoption9")}
        ></option>
        <option
          children="Stolen"
          value="Stolen"
          {...getOverrideProps(overrides, "statusoption10")}
        ></option>
        <option
          children="Multi"
          value="Multi"
          {...getOverrideProps(overrides, "statusoption11")}
        ></option>
        <option
          children="Unknown"
          value="Unknown"
          {...getOverrideProps(overrides, "statusoption12")}
        ></option>
      </SelectField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              id,
              sku,
              lastActivityBy,
              title,
              category,
              brand,
              color,
              size,
              description,
              details,
              images,
              condition,
              split,
              price,
              status,
              sales: values,
              printedAt,
              lastSoldAt,
              lastViewedAt,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            values = result?.sales ?? values;
          }
          setSales(values);
          setCurrentSalesValue("");
        }}
        currentFieldValue={currentSalesValue}
        label={"Sales"}
        items={sales}
        hasError={errors?.sales?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("sales", currentSalesValue)
        }
        errorMessage={errors?.sales?.errorMessage}
        setFieldValue={setCurrentSalesValue}
        inputFieldRef={salesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Sales"
          isRequired={false}
          isReadOnly={false}
          value={currentSalesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.sales?.hasError) {
              runValidationTasks("sales", value);
            }
            setCurrentSalesValue(value);
          }}
          onBlur={() => runValidationTasks("sales", currentSalesValue)}
          errorMessage={errors.sales?.errorMessage}
          hasError={errors.sales?.hasError}
          ref={salesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "sales")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Printed at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={printedAt && convertToLocal(new Date(printedAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              id,
              sku,
              lastActivityBy,
              title,
              category,
              brand,
              color,
              size,
              description,
              details,
              images,
              condition,
              split,
              price,
              status,
              sales,
              printedAt: value,
              lastSoldAt,
              lastViewedAt,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.printedAt ?? value;
          }
          if (errors.printedAt?.hasError) {
            runValidationTasks("printedAt", value);
          }
          setPrintedAt(value);
        }}
        onBlur={() => runValidationTasks("printedAt", printedAt)}
        errorMessage={errors.printedAt?.errorMessage}
        hasError={errors.printedAt?.hasError}
        {...getOverrideProps(overrides, "printedAt")}
      ></TextField>
      <TextField
        label="Last sold at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={lastSoldAt && convertToLocal(new Date(lastSoldAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              id,
              sku,
              lastActivityBy,
              title,
              category,
              brand,
              color,
              size,
              description,
              details,
              images,
              condition,
              split,
              price,
              status,
              sales,
              printedAt,
              lastSoldAt: value,
              lastViewedAt,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.lastSoldAt ?? value;
          }
          if (errors.lastSoldAt?.hasError) {
            runValidationTasks("lastSoldAt", value);
          }
          setLastSoldAt(value);
        }}
        onBlur={() => runValidationTasks("lastSoldAt", lastSoldAt)}
        errorMessage={errors.lastSoldAt?.errorMessage}
        hasError={errors.lastSoldAt?.hasError}
        {...getOverrideProps(overrides, "lastSoldAt")}
      ></TextField>
      <TextField
        label="Last viewed at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={lastViewedAt && convertToLocal(new Date(lastViewedAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              id,
              sku,
              lastActivityBy,
              title,
              category,
              brand,
              color,
              size,
              description,
              details,
              images,
              condition,
              split,
              price,
              status,
              sales,
              printedAt,
              lastSoldAt,
              lastViewedAt: value,
              createdAt,
              updatedAt,
              deletedAt,
            };
            const result = onChange(modelFields);
            value = result?.lastViewedAt ?? value;
          }
          if (errors.lastViewedAt?.hasError) {
            runValidationTasks("lastViewedAt", value);
          }
          setLastViewedAt(value);
        }}
        onBlur={() => runValidationTasks("lastViewedAt", lastViewedAt)}
        errorMessage={errors.lastViewedAt?.errorMessage}
        hasError={errors.lastViewedAt?.hasError}
        {...getOverrideProps(overrides, "lastViewedAt")}
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
              id,
              sku,
              lastActivityBy,
              title,
              category,
              brand,
              color,
              size,
              description,
              details,
              images,
              condition,
              split,
              price,
              status,
              sales,
              printedAt,
              lastSoldAt,
              lastViewedAt,
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
              sku,
              lastActivityBy,
              title,
              category,
              brand,
              color,
              size,
              description,
              details,
              images,
              condition,
              split,
              price,
              status,
              sales,
              printedAt,
              lastSoldAt,
              lastViewedAt,
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
              sku,
              lastActivityBy,
              title,
              category,
              brand,
              color,
              size,
              description,
              details,
              images,
              condition,
              split,
              price,
              status,
              sales,
              printedAt,
              lastSoldAt,
              lastViewedAt,
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
