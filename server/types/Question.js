const { gql } = require("apollo-server-express");

module.exports = QuestionType = gql `
  type Query {
    hello: String!
    users: [User!]!
  }
  type User {
    id: ID!
    email: String!
    password: String!
  }
  type Mutation {
    createUser(email: String!, password: String!): User!
  }
`;