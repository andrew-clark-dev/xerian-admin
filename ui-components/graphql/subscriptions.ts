/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAccount = /* GraphQL */ `
  subscription OnCreateAccount($filter: ModelSubscriptionAccountFilterInput) {
    onCreateAccount(filter: $filter) {
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
export const onCreateAction = /* GraphQL */ `
  subscription OnCreateAction($filter: ModelSubscriptionActionFilterInput) {
    onCreateAction(filter: $filter) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onCreateComment(filter: $filter, owner: $owner) {
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
export const onCreateCounter = /* GraphQL */ `
  subscription OnCreateCounter($filter: ModelSubscriptionCounterFilterInput) {
    onCreateCounter(filter: $filter) {
      createdAt
      name
      updatedAt
      val
      __typename
    }
  }
`;
export const onCreateCustomer = /* GraphQL */ `
  subscription OnCreateCustomer(
    $filter: ModelSubscriptionCustomerFilterInput
    $profileOwner: String
  ) {
    onCreateCustomer(filter: $filter, profileOwner: $profileOwner) {
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
export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem($filter: ModelSubscriptionItemFilterInput) {
    onCreateItem(filter: $filter) {
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
export const onCreateItemCategory = /* GraphQL */ `
  subscription OnCreateItemCategory(
    $filter: ModelSubscriptionItemCategoryFilterInput
  ) {
    onCreateItemCategory(filter: $filter) {
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
export const onCreateItemGroup = /* GraphQL */ `
  subscription OnCreateItemGroup(
    $filter: ModelSubscriptionItemGroupFilterInput
  ) {
    onCreateItemGroup(filter: $filter) {
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
export const onCreateSale = /* GraphQL */ `
  subscription OnCreateSale($filter: ModelSubscriptionSaleFilterInput) {
    onCreateSale(filter: $filter) {
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
export const onCreateTotal = /* GraphQL */ `
  subscription OnCreateTotal($filter: ModelSubscriptionTotalFilterInput) {
    onCreateTotal(filter: $filter) {
      createdAt
      name
      updatedAt
      val
      __typename
    }
  }
`;
export const onCreateTransaction = /* GraphQL */ `
  subscription OnCreateTransaction(
    $filter: ModelSubscriptionTransactionFilterInput
  ) {
    onCreateTransaction(filter: $filter) {
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
export const onCreateUserProfile = /* GraphQL */ `
  subscription OnCreateUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
    $profileOwner: String
  ) {
    onCreateUserProfile(filter: $filter, profileOwner: $profileOwner) {
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
export const onDeleteAccount = /* GraphQL */ `
  subscription OnDeleteAccount($filter: ModelSubscriptionAccountFilterInput) {
    onDeleteAccount(filter: $filter) {
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
export const onDeleteAction = /* GraphQL */ `
  subscription OnDeleteAction($filter: ModelSubscriptionActionFilterInput) {
    onDeleteAction(filter: $filter) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onDeleteComment(filter: $filter, owner: $owner) {
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
export const onDeleteCounter = /* GraphQL */ `
  subscription OnDeleteCounter($filter: ModelSubscriptionCounterFilterInput) {
    onDeleteCounter(filter: $filter) {
      createdAt
      name
      updatedAt
      val
      __typename
    }
  }
`;
export const onDeleteCustomer = /* GraphQL */ `
  subscription OnDeleteCustomer(
    $filter: ModelSubscriptionCustomerFilterInput
    $profileOwner: String
  ) {
    onDeleteCustomer(filter: $filter, profileOwner: $profileOwner) {
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
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem($filter: ModelSubscriptionItemFilterInput) {
    onDeleteItem(filter: $filter) {
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
export const onDeleteItemCategory = /* GraphQL */ `
  subscription OnDeleteItemCategory(
    $filter: ModelSubscriptionItemCategoryFilterInput
  ) {
    onDeleteItemCategory(filter: $filter) {
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
export const onDeleteItemGroup = /* GraphQL */ `
  subscription OnDeleteItemGroup(
    $filter: ModelSubscriptionItemGroupFilterInput
  ) {
    onDeleteItemGroup(filter: $filter) {
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
export const onDeleteSale = /* GraphQL */ `
  subscription OnDeleteSale($filter: ModelSubscriptionSaleFilterInput) {
    onDeleteSale(filter: $filter) {
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
export const onDeleteTotal = /* GraphQL */ `
  subscription OnDeleteTotal($filter: ModelSubscriptionTotalFilterInput) {
    onDeleteTotal(filter: $filter) {
      createdAt
      name
      updatedAt
      val
      __typename
    }
  }
`;
export const onDeleteTransaction = /* GraphQL */ `
  subscription OnDeleteTransaction(
    $filter: ModelSubscriptionTransactionFilterInput
  ) {
    onDeleteTransaction(filter: $filter) {
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
export const onDeleteUserProfile = /* GraphQL */ `
  subscription OnDeleteUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
    $profileOwner: String
  ) {
    onDeleteUserProfile(filter: $filter, profileOwner: $profileOwner) {
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
export const onUpdateAccount = /* GraphQL */ `
  subscription OnUpdateAccount($filter: ModelSubscriptionAccountFilterInput) {
    onUpdateAccount(filter: $filter) {
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
export const onUpdateAction = /* GraphQL */ `
  subscription OnUpdateAction($filter: ModelSubscriptionActionFilterInput) {
    onUpdateAction(filter: $filter) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onUpdateComment(filter: $filter, owner: $owner) {
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
export const onUpdateCounter = /* GraphQL */ `
  subscription OnUpdateCounter($filter: ModelSubscriptionCounterFilterInput) {
    onUpdateCounter(filter: $filter) {
      createdAt
      name
      updatedAt
      val
      __typename
    }
  }
`;
export const onUpdateCustomer = /* GraphQL */ `
  subscription OnUpdateCustomer(
    $filter: ModelSubscriptionCustomerFilterInput
    $profileOwner: String
  ) {
    onUpdateCustomer(filter: $filter, profileOwner: $profileOwner) {
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
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem($filter: ModelSubscriptionItemFilterInput) {
    onUpdateItem(filter: $filter) {
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
export const onUpdateItemCategory = /* GraphQL */ `
  subscription OnUpdateItemCategory(
    $filter: ModelSubscriptionItemCategoryFilterInput
  ) {
    onUpdateItemCategory(filter: $filter) {
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
export const onUpdateItemGroup = /* GraphQL */ `
  subscription OnUpdateItemGroup(
    $filter: ModelSubscriptionItemGroupFilterInput
  ) {
    onUpdateItemGroup(filter: $filter) {
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
export const onUpdateSale = /* GraphQL */ `
  subscription OnUpdateSale($filter: ModelSubscriptionSaleFilterInput) {
    onUpdateSale(filter: $filter) {
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
export const onUpdateTotal = /* GraphQL */ `
  subscription OnUpdateTotal($filter: ModelSubscriptionTotalFilterInput) {
    onUpdateTotal(filter: $filter) {
      createdAt
      name
      updatedAt
      val
      __typename
    }
  }
`;
export const onUpdateTransaction = /* GraphQL */ `
  subscription OnUpdateTransaction(
    $filter: ModelSubscriptionTransactionFilterInput
  ) {
    onUpdateTransaction(filter: $filter) {
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
export const onUpdateUserProfile = /* GraphQL */ `
  subscription OnUpdateUserProfile(
    $filter: ModelSubscriptionUserProfileFilterInput
    $profileOwner: String
  ) {
    onUpdateUserProfile(filter: $filter, profileOwner: $profileOwner) {
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
