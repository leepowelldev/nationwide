import { gql } from 'apollo-server-core';
import PropertiesDataSource from './propertiesDataSource.js';
import { PropertyArgs } from './property.js';

const typeDefs = gql`
  enum PropertyType {
    HOUSE
    FLAT
    BUNGALOW
  }

  type Property {
    id: ID!
    address: String!
    type: PropertyType!
    bedrooms: Int!
  }

  input PropertyInput {
    address: String!
    type: PropertyType!
    bedrooms: Int!
  }

  type DeletePayload {
    result: String!
    error: String
  }

  type Query {
    property(id: ID!): Property
    allProperties: [Property]
  }

  type Mutation {
    createProperty(input: PropertyInput!): Property
    updateProperty(id: ID!, input: PropertyInput!): Property
    deleteProperty(id: ID!): DeletePayload
  }
`;

type Context = {
  dataSources: {
    properties: PropertiesDataSource;
  };
};

type GetPropertyArgs = { id: string };
type CreatePropertyArgs = {
  input: PropertyArgs;
};
type UpdatePropertyArgs = { id: string; input: PropertyArgs };
type DeletePropertyArgs = { id: string };

const resolvers = {
  PropertyType: {
    HOUSE: 'house',
    FLAT: 'flat',
    BUNGALOW: 'bungalow',
  },
  Query: {
    property: (parent: never, { id }: GetPropertyArgs, context: Context) => {
      return context.dataSources.properties.get(id);
    },
    allProperties: (parent: never, args: never, context: Context) => {
      return context.dataSources.properties.all();
    },
  },
  Mutation: {
    createProperty: (
      parent: never,
      { input }: CreatePropertyArgs,
      context: Context
    ) => {
      return context.dataSources.properties.create(input);
    },
    updateProperty: (
      parent: never,
      { id, input }: UpdatePropertyArgs,
      context: Context
    ) => {
      return context.dataSources.properties.update(id, input);
    },
    deleteProperty: (
      parent: never,
      { id }: DeletePropertyArgs,
      context: Context
    ) => {
      return context.dataSources.properties.delete(id);
    },
  },
};

export { typeDefs, resolvers };
