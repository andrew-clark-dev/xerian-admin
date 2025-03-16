/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAccount = /* GraphQL */ `
  mutation CreateAccount(
    $condition: ModelAccountConditionInput
    $input: CreateAccountInput!
  ) {
    createAccount(condition: $condition, input: $input) {
      addressLine1
      addressLine2
      balance
      city
      comunicationPreferences
      createdAt
      defaultSplit
      deletedAt
      email
      firstName
      id
      isMobile
      items {
        nextToken
        __typename
      }
      kind
      lastActivityAt
      lastActivityBy
      lastItemAt
      lastName
      lastSettlementAt
      noItems
      noSales
      number
      phoneNumber
      postcode
      state
      status
      tags
      transactions
      updatedAt
      __typename
    }
  }
`;
export const createAction = /* GraphQL */ `
  mutation CreateAction(
    $condition: ModelActionConditionInput
    $input: CreateActionInput!
  ) {
    createAction(condition: $condition, input: $input) {
      actor
      after
      before
      createdAt
      createdBy {
        cognitoName
        createdAt
        deletedAt
        email
        id
        nickname
        phoneNumber
        photo
        profileOwner
        role
        settings
        status
        updatedAt
        __typename
      }
      description
      id
      modelName
      refId
      type
      typeIndex
      updatedAt
      userId
      __typename
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $condition: ModelCommentConditionInput
    $input: CreateCommentInput!
  ) {
    createComment(condition: $condition, input: $input) {
      createdAt
      createdBy {
        cognitoName
        createdAt
        deletedAt
        email
        id
        nickname
        phoneNumber
        photo
        profileOwner
        role
        settings
        status
        updatedAt
        __typename
      }
      id
      lastActivityBy
      owner
      refId
      refType
      text
      type
      updatedAt
      userId
      __typename
    }
  }
`;
export const createCounter = /* GraphQL */ `
  mutation CreateCounter(
    $condition: ModelCounterConditionInput
    $input: CreateCounterInput!
  ) {
    createCounter(condition: $condition, input: $input) {
      createdAt
      name
      updatedAt
      val
      __typename
    }
  }
`;
export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $condition: ModelCustomerConditionInput
    $input: CreateCustomerInput!
  ) {
    createCustomer(condition: $condition, input: $input) {
      createdAt
      email
      id
      name
      profileOwner
      sales
      updatedAt
      __typename
    }
  }
`;
export const createItem = /* GraphQL */ `
  mutation CreateItem(
    $condition: ModelItemConditionInput
    $input: CreateItemInput!
  ) {
    createItem(condition: $condition, input: $input) {
      account {
        addressLine1
        addressLine2
        balance
        city
        comunicationPreferences
        createdAt
        defaultSplit
        deletedAt
        email
        firstName
        id
        isMobile
        kind
        lastActivityAt
        lastActivityBy
        lastItemAt
        lastName
        lastSettlementAt
        noItems
        noSales
        number
        phoneNumber
        postcode
        state
        status
        tags
        transactions
        updatedAt
        __typename
      }
      accountNumber
      brand
      category
      color
      condition
      createdAt
      deletedAt
      description
      details
      group {
        createdAt
        id
        itemSku
        quantity
        statuses
        updatedAt
        __typename
      }
      id
      images
      lastActivityBy
      lastSoldAt
      lastViewedAt
      price
      printedAt
      sales
      size
      sku
      split
      status
      title
      updatedAt
      __typename
    }
  }
`;
export const createItemCategory = /* GraphQL */ `
  mutation CreateItemCategory(
    $condition: ModelItemCategoryConditionInput
    $input: CreateItemCategoryInput!
  ) {
    createItemCategory(condition: $condition, input: $input) {
      categoryKind
      createdAt
      deletedAt
      kind
      lastActivityBy
      matchNames
      name
      updatedAt
      __typename
    }
  }
`;
export const createItemGroup = /* GraphQL */ `
  mutation CreateItemGroup(
    $condition: ModelItemGroupConditionInput
    $input: CreateItemGroupInput!
  ) {
    createItemGroup(condition: $condition, input: $input) {
      createdAt
      id
      item {
        accountNumber
        brand
        category
        color
        condition
        createdAt
        deletedAt
        description
        details
        id
        images
        lastActivityBy
        lastSoldAt
        lastViewedAt
        price
        printedAt
        sales
        size
        sku
        split
        status
        title
        updatedAt
        __typename
      }
      itemSku
      quantity
      statuses
      updatedAt
      __typename
    }
  }
`;
export const createSale = /* GraphQL */ `
  mutation CreateSale(
    $condition: ModelSaleConditionInput
    $input: CreateSaleInput!
  ) {
    createSale(condition: $condition, input: $input) {
      accountNumber
      accountTotal
      change
      createdAt
      customerEmail
      discount {
        label
        value
        __typename
      }
      gross
      id
      items {
        brand
        category
        color
        condition
        description
        details
        price
        size
        sku
        split
        title
        __typename
      }
      lastActivityBy
      number
      refund
      refundedSale
      status
      storeTotal
      subTotal
      tax
      total
      transaction
      updatedAt
      __typename
    }
  }
`;
export const createTotal = /* GraphQL */ `
  mutation CreateTotal(
    $condition: ModelTotalConditionInput
    $input: CreateTotalInput!
  ) {
    createTotal(condition: $condition, input: $input) {
      createdAt
      name
      updatedAt
      val
      __typename
    }
  }
`;
export const createTransaction = /* GraphQL */ `
  mutation CreateTransaction(
    $condition: ModelTransactionConditionInput
    $input: CreateTransactionInput!
  ) {
    createTransaction(condition: $condition, input: $input) {
      amount
      createdAt
      id
      lastActivityBy
      linked
      paymentType
      status
      tax
      type
      updatedAt
      __typename
    }
  }
`;
export const createUserProfile = /* GraphQL */ `
  mutation CreateUserProfile(
    $condition: ModelUserProfileConditionInput
    $input: CreateUserProfileInput!
  ) {
    createUserProfile(condition: $condition, input: $input) {
      actions {
        nextToken
        __typename
      }
      cognitoName
      comments {
        nextToken
        __typename
      }
      createdAt
      deletedAt
      email
      id
      nickname
      phoneNumber
      photo
      profileOwner
      role
      settings
      status
      updatedAt
      __typename
    }
  }
`;
export const deleteAccount = /* GraphQL */ `
  mutation DeleteAccount(
    $condition: ModelAccountConditionInput
    $input: DeleteAccountInput!
  ) {
    deleteAccount(condition: $condition, input: $input) {
      addressLine1
      addressLine2
      balance
      city
      comunicationPreferences
      createdAt
      defaultSplit
      deletedAt
      email
      firstName
      id
      isMobile
      items {
        nextToken
        __typename
      }
      kind
      lastActivityAt
      lastActivityBy
      lastItemAt
      lastName
      lastSettlementAt
      noItems
      noSales
      number
      phoneNumber
      postcode
      state
      status
      tags
      transactions
      updatedAt
      __typename
    }
  }
`;
export const deleteAction = /* GraphQL */ `
  mutation DeleteAction(
    $condition: ModelActionConditionInput
    $input: DeleteActionInput!
  ) {
    deleteAction(condition: $condition, input: $input) {
      actor
      after
      before
      createdAt
      createdBy {
        cognitoName
        createdAt
        deletedAt
        email
        id
        nickname
        phoneNumber
        photo
        profileOwner
        role
        settings
        status
        updatedAt
        __typename
      }
      description
      id
      modelName
      refId
      type
      typeIndex
      updatedAt
      userId
      __typename
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $condition: ModelCommentConditionInput
    $input: DeleteCommentInput!
  ) {
    deleteComment(condition: $condition, input: $input) {
      createdAt
      createdBy {
        cognitoName
        createdAt
        deletedAt
        email
        id
        nickname
        phoneNumber
        photo
        profileOwner
        role
        settings
        status
        updatedAt
        __typename
      }
      id
      lastActivityBy
      owner
      refId
      refType
      text
      type
      updatedAt
      userId
      __typename
    }
  }
`;
export const deleteCounter = /* GraphQL */ `
  mutation DeleteCounter(
    $condition: ModelCounterConditionInput
    $input: DeleteCounterInput!
  ) {
    deleteCounter(condition: $condition, input: $input) {
      createdAt
      name
      updatedAt
      val
      __typename
    }
  }
`;
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $condition: ModelCustomerConditionInput
    $input: DeleteCustomerInput!
  ) {
    deleteCustomer(condition: $condition, input: $input) {
      createdAt
      email
      id
      name
      profileOwner
      sales
      updatedAt
      __typename
    }
  }
`;
export const deleteItem = /* GraphQL */ `
  mutation DeleteItem(
    $condition: ModelItemConditionInput
    $input: DeleteItemInput!
  ) {
    deleteItem(condition: $condition, input: $input) {
      account {
        addressLine1
        addressLine2
        balance
        city
        comunicationPreferences
        createdAt
        defaultSplit
        deletedAt
        email
        firstName
        id
        isMobile
        kind
        lastActivityAt
        lastActivityBy
        lastItemAt
        lastName
        lastSettlementAt
        noItems
        noSales
        number
        phoneNumber
        postcode
        state
        status
        tags
        transactions
        updatedAt
        __typename
      }
      accountNumber
      brand
      category
      color
      condition
      createdAt
      deletedAt
      description
      details
      group {
        createdAt
        id
        itemSku
        quantity
        statuses
        updatedAt
        __typename
      }
      id
      images
      lastActivityBy
      lastSoldAt
      lastViewedAt
      price
      printedAt
      sales
      size
      sku
      split
      status
      title
      updatedAt
      __typename
    }
  }
`;
export const deleteItemCategory = /* GraphQL */ `
  mutation DeleteItemCategory(
    $condition: ModelItemCategoryConditionInput
    $input: DeleteItemCategoryInput!
  ) {
    deleteItemCategory(condition: $condition, input: $input) {
      categoryKind
      createdAt
      deletedAt
      kind
      lastActivityBy
      matchNames
      name
      updatedAt
      __typename
    }
  }
`;
export const deleteItemGroup = /* GraphQL */ `
  mutation DeleteItemGroup(
    $condition: ModelItemGroupConditionInput
    $input: DeleteItemGroupInput!
  ) {
    deleteItemGroup(condition: $condition, input: $input) {
      createdAt
      id
      item {
        accountNumber
        brand
        category
        color
        condition
        createdAt
        deletedAt
        description
        details
        id
        images
        lastActivityBy
        lastSoldAt
        lastViewedAt
        price
        printedAt
        sales
        size
        sku
        split
        status
        title
        updatedAt
        __typename
      }
      itemSku
      quantity
      statuses
      updatedAt
      __typename
    }
  }
`;
export const deleteSale = /* GraphQL */ `
  mutation DeleteSale(
    $condition: ModelSaleConditionInput
    $input: DeleteSaleInput!
  ) {
    deleteSale(condition: $condition, input: $input) {
      accountNumber
      accountTotal
      change
      createdAt
      customerEmail
      discount {
        label
        value
        __typename
      }
      gross
      id
      items {
        brand
        category
        color
        condition
        description
        details
        price
        size
        sku
        split
        title
        __typename
      }
      lastActivityBy
      number
      refund
      refundedSale
      status
      storeTotal
      subTotal
      tax
      total
      transaction
      updatedAt
      __typename
    }
  }
`;
export const deleteTotal = /* GraphQL */ `
  mutation DeleteTotal(
    $condition: ModelTotalConditionInput
    $input: DeleteTotalInput!
  ) {
    deleteTotal(condition: $condition, input: $input) {
      createdAt
      name
      updatedAt
      val
      __typename
    }
  }
`;
export const deleteTransaction = /* GraphQL */ `
  mutation DeleteTransaction(
    $condition: ModelTransactionConditionInput
    $input: DeleteTransactionInput!
  ) {
    deleteTransaction(condition: $condition, input: $input) {
      amount
      createdAt
      id
      lastActivityBy
      linked
      paymentType
      status
      tax
      type
      updatedAt
      __typename
    }
  }
`;
export const deleteUserProfile = /* GraphQL */ `
  mutation DeleteUserProfile(
    $condition: ModelUserProfileConditionInput
    $input: DeleteUserProfileInput!
  ) {
    deleteUserProfile(condition: $condition, input: $input) {
      actions {
        nextToken
        __typename
      }
      cognitoName
      comments {
        nextToken
        __typename
      }
      createdAt
      deletedAt
      email
      id
      nickname
      phoneNumber
      photo
      profileOwner
      role
      settings
      status
      updatedAt
      __typename
    }
  }
`;
export const updateAccount = /* GraphQL */ `
  mutation UpdateAccount(
    $condition: ModelAccountConditionInput
    $input: UpdateAccountInput!
  ) {
    updateAccount(condition: $condition, input: $input) {
      addressLine1
      addressLine2
      balance
      city
      comunicationPreferences
      createdAt
      defaultSplit
      deletedAt
      email
      firstName
      id
      isMobile
      items {
        nextToken
        __typename
      }
      kind
      lastActivityAt
      lastActivityBy
      lastItemAt
      lastName
      lastSettlementAt
      noItems
      noSales
      number
      phoneNumber
      postcode
      state
      status
      tags
      transactions
      updatedAt
      __typename
    }
  }
`;
export const updateAction = /* GraphQL */ `
  mutation UpdateAction(
    $condition: ModelActionConditionInput
    $input: UpdateActionInput!
  ) {
    updateAction(condition: $condition, input: $input) {
      actor
      after
      before
      createdAt
      createdBy {
        cognitoName
        createdAt
        deletedAt
        email
        id
        nickname
        phoneNumber
        photo
        profileOwner
        role
        settings
        status
        updatedAt
        __typename
      }
      description
      id
      modelName
      refId
      type
      typeIndex
      updatedAt
      userId
      __typename
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $condition: ModelCommentConditionInput
    $input: UpdateCommentInput!
  ) {
    updateComment(condition: $condition, input: $input) {
      createdAt
      createdBy {
        cognitoName
        createdAt
        deletedAt
        email
        id
        nickname
        phoneNumber
        photo
        profileOwner
        role
        settings
        status
        updatedAt
        __typename
      }
      id
      lastActivityBy
      owner
      refId
      refType
      text
      type
      updatedAt
      userId
      __typename
    }
  }
`;
export const updateCounter = /* GraphQL */ `
  mutation UpdateCounter(
    $condition: ModelCounterConditionInput
    $input: UpdateCounterInput!
  ) {
    updateCounter(condition: $condition, input: $input) {
      createdAt
      name
      updatedAt
      val
      __typename
    }
  }
`;
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $condition: ModelCustomerConditionInput
    $input: UpdateCustomerInput!
  ) {
    updateCustomer(condition: $condition, input: $input) {
      createdAt
      email
      id
      name
      profileOwner
      sales
      updatedAt
      __typename
    }
  }
`;
export const updateItem = /* GraphQL */ `
  mutation UpdateItem(
    $condition: ModelItemConditionInput
    $input: UpdateItemInput!
  ) {
    updateItem(condition: $condition, input: $input) {
      account {
        addressLine1
        addressLine2
        balance
        city
        comunicationPreferences
        createdAt
        defaultSplit
        deletedAt
        email
        firstName
        id
        isMobile
        kind
        lastActivityAt
        lastActivityBy
        lastItemAt
        lastName
        lastSettlementAt
        noItems
        noSales
        number
        phoneNumber
        postcode
        state
        status
        tags
        transactions
        updatedAt
        __typename
      }
      accountNumber
      brand
      category
      color
      condition
      createdAt
      deletedAt
      description
      details
      group {
        createdAt
        id
        itemSku
        quantity
        statuses
        updatedAt
        __typename
      }
      id
      images
      lastActivityBy
      lastSoldAt
      lastViewedAt
      price
      printedAt
      sales
      size
      sku
      split
      status
      title
      updatedAt
      __typename
    }
  }
`;
export const updateItemCategory = /* GraphQL */ `
  mutation UpdateItemCategory(
    $condition: ModelItemCategoryConditionInput
    $input: UpdateItemCategoryInput!
  ) {
    updateItemCategory(condition: $condition, input: $input) {
      categoryKind
      createdAt
      deletedAt
      kind
      lastActivityBy
      matchNames
      name
      updatedAt
      __typename
    }
  }
`;
export const updateItemGroup = /* GraphQL */ `
  mutation UpdateItemGroup(
    $condition: ModelItemGroupConditionInput
    $input: UpdateItemGroupInput!
  ) {
    updateItemGroup(condition: $condition, input: $input) {
      createdAt
      id
      item {
        accountNumber
        brand
        category
        color
        condition
        createdAt
        deletedAt
        description
        details
        id
        images
        lastActivityBy
        lastSoldAt
        lastViewedAt
        price
        printedAt
        sales
        size
        sku
        split
        status
        title
        updatedAt
        __typename
      }
      itemSku
      quantity
      statuses
      updatedAt
      __typename
    }
  }
`;
export const updateSale = /* GraphQL */ `
  mutation UpdateSale(
    $condition: ModelSaleConditionInput
    $input: UpdateSaleInput!
  ) {
    updateSale(condition: $condition, input: $input) {
      accountNumber
      accountTotal
      change
      createdAt
      customerEmail
      discount {
        label
        value
        __typename
      }
      gross
      id
      items {
        brand
        category
        color
        condition
        description
        details
        price
        size
        sku
        split
        title
        __typename
      }
      lastActivityBy
      number
      refund
      refundedSale
      status
      storeTotal
      subTotal
      tax
      total
      transaction
      updatedAt
      __typename
    }
  }
`;
export const updateTotal = /* GraphQL */ `
  mutation UpdateTotal(
    $condition: ModelTotalConditionInput
    $input: UpdateTotalInput!
  ) {
    updateTotal(condition: $condition, input: $input) {
      createdAt
      name
      updatedAt
      val
      __typename
    }
  }
`;
export const updateTransaction = /* GraphQL */ `
  mutation UpdateTransaction(
    $condition: ModelTransactionConditionInput
    $input: UpdateTransactionInput!
  ) {
    updateTransaction(condition: $condition, input: $input) {
      amount
      createdAt
      id
      lastActivityBy
      linked
      paymentType
      status
      tax
      type
      updatedAt
      __typename
    }
  }
`;
export const updateUserProfile = /* GraphQL */ `
  mutation UpdateUserProfile(
    $condition: ModelUserProfileConditionInput
    $input: UpdateUserProfileInput!
  ) {
    updateUserProfile(condition: $condition, input: $input) {
      actions {
        nextToken
        __typename
      }
      cognitoName
      comments {
        nextToken
        __typename
      }
      createdAt
      deletedAt
      email
      id
      nickname
      phoneNumber
      photo
      profileOwner
      role
      settings
      status
      updatedAt
      __typename
    }
  }
`;
