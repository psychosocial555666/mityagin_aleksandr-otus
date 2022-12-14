export const typeDefs = `
  input UserInput {
    login: String!
    userName: String!
    password: String!
  }
  
  input OrderInput {
    userId: ID!
  }

  input ProductInput {
    name: String!
    price: Int!
    description: String
  }
  
  type User {
    id: ID!
    login: String!
    userName: String!
  }
  
  type Order {
    id: ID!
    userId: ID!
    products: [Product]
  }

  type Product {
    id: ID!
    name: String!
    price: Int!
    description: String
  }

  type Query {
    getUsers: [User]!
    getUserById(id: ID): User
    getOrderById(id: ID!): Order 
    getOrdersByUserId(userId: ID!): [Order]!
    getProducts: [Product]!
    getProductById(id: ID!): Product
  } 

  type Mutation {
    createUser(user: UserInput): User!
    createOrder(order: OrderInput!): Order!
    createProduct(product: ProductInput!): Product!
    addProductToOrder(productId: ID!, orderId: ID!): Order!
  }
`