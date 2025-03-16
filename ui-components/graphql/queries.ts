/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAccount = /* GraphQL */ `
  query GetAccount($number: String!) {
    getAccount(number: $number) {
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
export const getAction = /* GraphQL */ `
  query GetAction($id: ID!) {
    getAction(id: $id) {
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
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const getCounter = /* GraphQL */ `
  query GetCounter($name: String!) {
    getCounter(name: $name) {
      createdAt
      name
      updatedAt
      val
      __typename
    }
  }
`;
export const getCustomer = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
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
export const getItem = /* GraphQL */ `
  query GetItem($sku: String!) {
    getItem(sku: $sku) {
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
export const getItemCategory = /* GraphQL */ `
  query GetItemCategory($kind: String!, $name: String!) {
    getItemCategory(kind: $kind, name: $name) {
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
export const getItemGroup = /* GraphQL */ `
  query GetItemGroup($id: ID!) {
    getItemGroup(id: $id) {
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
export const getSale = /* GraphQL */ `
  query GetSale($number: String!) {
    getSale(number: $number) {
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
export const getTotal = /* GraphQL */ `
  query GetTotal($name: String!) {
    getTotal(name: $name) {
      createdAt
      name
      updatedAt
      val
      __typename
    }
  }
`;
export const getTransaction = /* GraphQL */ `
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
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
export const getUserProfile = /* GraphQL */ `
  query GetUserProfile($id: ID!) {
    getUserProfile(id: $id) {
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
export const listAccountByDeletedAtAndNumberAndCreatedAtAndBalance = /* GraphQL */ `
  query ListAccountByDeletedAtAndNumberAndCreatedAtAndBalance(
    $deletedAt: AWSDateTime!
    $filter: ModelAccountFilterInput
    $limit: Int
    $nextToken: String
    $numberCreatedAtBalance: ModelAccountAccountsByDeletedAtAndNumberAndCreatedAtAndBalanceCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
  ) {
    listAccountByDeletedAtAndNumberAndCreatedAtAndBalance(
      deletedAt: $deletedAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      numberCreatedAtBalance: $numberCreatedAtBalance
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listAccountById = /* GraphQL */ `
  query ListAccountById(
    $filter: ModelAccountFilterInput
    $id: ID!
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAccountById(
      filter: $filter
      id: $id
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listAccountByStatus = /* GraphQL */ `
  query ListAccountByStatus(
    $filter: ModelAccountFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
    $status: AccountStatus!
  ) {
    listAccountByStatus(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
      status: $status
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listAccounts = /* GraphQL */ `
  query ListAccounts(
    $filter: ModelAccountFilterInput
    $limit: Int
    $nextToken: String
    $number: String
    $sortDirection: ModelSortDirection
  ) {
    listAccounts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      number: $number
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listActionByModelName = /* GraphQL */ `
  query ListActionByModelName(
    $filter: ModelActionFilterInput
    $limit: Int
    $modelName: String!
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listActionByModelName(
      filter: $filter
      limit: $limit
      modelName: $modelName
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        actor
        after
        before
        createdAt
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
      nextToken
      __typename
    }
  }
`;
export const listActionByRefId = /* GraphQL */ `
  query ListActionByRefId(
    $filter: ModelActionFilterInput
    $limit: Int
    $nextToken: String
    $refId: ID!
    $sortDirection: ModelSortDirection
  ) {
    listActionByRefId(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      refId: $refId
      sortDirection: $sortDirection
    ) {
      items {
        actor
        after
        before
        createdAt
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
      nextToken
      __typename
    }
  }
`;
export const listActionByTypeIndex = /* GraphQL */ `
  query ListActionByTypeIndex(
    $filter: ModelActionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
    $typeIndex: String!
  ) {
    listActionByTypeIndex(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
      typeIndex: $typeIndex
    ) {
      items {
        actor
        after
        before
        createdAt
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
      nextToken
      __typename
    }
  }
`;
export const listActionByUserId = /* GraphQL */ `
  query ListActionByUserId(
    $filter: ModelActionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
    $userId: ID!
  ) {
    listActionByUserId(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
      userId: $userId
    ) {
      items {
        actor
        after
        before
        createdAt
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
      nextToken
      __typename
    }
  }
`;
export const listActions = /* GraphQL */ `
  query ListActions(
    $filter: ModelActionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        actor
        after
        before
        createdAt
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
      nextToken
      __typename
    }
  }
`;
export const listCommentByRefId = /* GraphQL */ `
  query ListCommentByRefId(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
    $refId: ID!
    $sortDirection: ModelSortDirection
  ) {
    listCommentByRefId(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      refId: $refId
      sortDirection: $sortDirection
    ) {
      items {
        createdAt
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
      nextToken
      __typename
    }
  }
`;
export const listCommentByUserId = /* GraphQL */ `
  query ListCommentByUserId(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
    $userId: ID!
  ) {
    listCommentByUserId(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
      userId: $userId
    ) {
      items {
        createdAt
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
      nextToken
      __typename
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
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
      nextToken
      __typename
    }
  }
`;
export const listCounters = /* GraphQL */ `
  query ListCounters(
    $filter: ModelCounterFilterInput
    $limit: Int
    $name: String
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCounters(
      filter: $filter
      limit: $limit
      name: $name
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        createdAt
        name
        updatedAt
        val
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listCustomerByEmail = /* GraphQL */ `
  query ListCustomerByEmail(
    $email: AWSEmail!
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCustomerByEmail(
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        createdAt
        email
        id
        name
        profileOwner
        sales
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        email
        id
        name
        profileOwner
        sales
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listItemByBrand = /* GraphQL */ `
  query ListItemByBrand(
    $brand: String!
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listItemByBrand(
      brand: $brand
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listItemByCategory = /* GraphQL */ `
  query ListItemByCategory(
    $category: String!
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listItemByCategory(
      category: $category
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listItemByColor = /* GraphQL */ `
  query ListItemByColor(
    $color: String!
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listItemByColor(
      color: $color
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listItemByCreatedAt = /* GraphQL */ `
  query ListItemByCreatedAt(
    $createdAt: AWSDateTime!
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listItemByCreatedAt(
      createdAt: $createdAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listItemById = /* GraphQL */ `
  query ListItemById(
    $filter: ModelItemFilterInput
    $id: ID!
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listItemById(
      filter: $filter
      id: $id
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listItemBySize = /* GraphQL */ `
  query ListItemBySize(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
    $size: String!
    $sortDirection: ModelSortDirection
  ) {
    listItemBySize(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      size: $size
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listItemByStatus = /* GraphQL */ `
  query ListItemByStatus(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
    $status: ItemStatus!
  ) {
    listItemByStatus(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
      status: $status
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listItemCategories = /* GraphQL */ `
  query ListItemCategories(
    $filter: ModelItemCategoryFilterInput
    $kind: String
    $limit: Int
    $name: ModelStringKeyConditionInput
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listItemCategories(
      filter: $filter
      kind: $kind
      limit: $limit
      name: $name
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listItemCategoryByKind = /* GraphQL */ `
  query ListItemCategoryByKind(
    $filter: ModelItemCategoryFilterInput
    $kind: String!
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listItemCategoryByKind(
      filter: $filter
      kind: $kind
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listItemCategoryByMatchNames = /* GraphQL */ `
  query ListItemCategoryByMatchNames(
    $filter: ModelItemCategoryFilterInput
    $limit: Int
    $matchNames: String!
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listItemCategoryByMatchNames(
      filter: $filter
      limit: $limit
      matchNames: $matchNames
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listItemGroups = /* GraphQL */ `
  query ListItemGroups(
    $filter: ModelItemGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItemGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        id
        itemSku
        quantity
        statuses
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
    $sku: String
    $sortDirection: ModelSortDirection
  ) {
    listItems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sku: $sku
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listSaleByRefundedSale = /* GraphQL */ `
  query ListSaleByRefundedSale(
    $filter: ModelSaleFilterInput
    $limit: Int
    $nextToken: String
    $refundedSale: String!
    $sortDirection: ModelSortDirection
  ) {
    listSaleByRefundedSale(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      refundedSale: $refundedSale
      sortDirection: $sortDirection
    ) {
      items {
        accountNumber
        accountTotal
        change
        createdAt
        customerEmail
        gross
        id
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
      nextToken
      __typename
    }
  }
`;
export const listSaleByTransaction = /* GraphQL */ `
  query ListSaleByTransaction(
    $filter: ModelSaleFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
    $transaction: ID!
  ) {
    listSaleByTransaction(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
      transaction: $transaction
    ) {
      items {
        accountNumber
        accountTotal
        change
        createdAt
        customerEmail
        gross
        id
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
      nextToken
      __typename
    }
  }
`;
export const listSales = /* GraphQL */ `
  query ListSales(
    $filter: ModelSaleFilterInput
    $limit: Int
    $nextToken: String
    $number: String
    $sortDirection: ModelSortDirection
  ) {
    listSales(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      number: $number
      sortDirection: $sortDirection
    ) {
      items {
        accountNumber
        accountTotal
        change
        createdAt
        customerEmail
        gross
        id
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
      nextToken
      __typename
    }
  }
`;
export const listTotals = /* GraphQL */ `
  query ListTotals(
    $filter: ModelTotalFilterInput
    $limit: Int
    $name: String
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTotals(
      filter: $filter
      limit: $limit
      name: $name
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        createdAt
        name
        updatedAt
        val
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listTransactionByType = /* GraphQL */ `
  query ListTransactionByType(
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
    $type: TransactionType!
  ) {
    listTransactionByType(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
      type: $type
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listUserProfileByCognitoName = /* GraphQL */ `
  query ListUserProfileByCognitoName(
    $cognitoName: String!
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserProfileByCognitoName(
      cognitoName: $cognitoName
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listUserProfileByEmail = /* GraphQL */ `
  query ListUserProfileByEmail(
    $email: String!
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserProfileByEmail(
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listUserProfileByNickname = /* GraphQL */ `
  query ListUserProfileByNickname(
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
    $nickname: String!
    $sortDirection: ModelSortDirection
  ) {
    listUserProfileByNickname(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      nickname: $nickname
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listUserProfiles = /* GraphQL */ `
  query ListUserProfiles(
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
