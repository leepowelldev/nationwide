import { gql } from 'apollo-server-core';
import Property from './property.js';

const typeDefs = gql`
  type Property {
    id: ID!
    address: String
    type: String
  }

  type DeleteResponse {
    result: String!
    error: String
  }

  type Query {
    property(id: ID!): Property
    allProperties: [Property]
  }

  type Mutation {
    updateProperty(id: ID!): Property
    deleteProperty(id: ID!): DeleteResponse
  }
`;

const resolvers = {
  Query: {
    property: () => Property.get('1'),
    allProperties: () => Property.all(),
  },
  Mutation: {
    updateProperty: () => Property.update('1'),
    deleteProperty: () => Property.remove('1'),
  },
};

export { typeDefs, resolvers };
