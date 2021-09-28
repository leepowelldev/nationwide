import { gql } from 'apollo-server';
import { PropertiesDataSource } from './propertiesDataSource';
import { PropertyDocument, PropertyFields } from './types';

type IdArg = { id: string };
type InputArg = { input: PropertyFields };

type Context = {
  dataSources: {
    properties: PropertiesDataSource;
  };
};

const typeDefs = gql`
  enum PropertyType {
    HOUSE
    FLAT
    BUNGALOW
  }

  type PropertyDocument {
    _id: ID!
    address: String!
    type: PropertyType!
    bedrooms: Int!
  }

  input PropertyInput {
    address: String!
    type: PropertyType!
    bedrooms: Int!
  }

  type Query {
    getProperty(id: ID!): PropertyDocument
    allProperties: [PropertyDocument]
  }

  type Mutation {
    createProperty(input: PropertyInput!): PropertyDocument
    updateProperty(id: ID!, input: PropertyInput!): PropertyDocument
    deleteProperty(id: ID!): String
  }
`;

const resolvers = {
  PropertyType: {
    HOUSE: 'house',
    FLAT: 'flat',
    BUNGALOW: 'bungalow',
  },
  Query: {
    getProperty: (
      parent: never,
      { id }: IdArg,
      context: Context
    ): Promise<PropertyDocument | null> =>
      context.dataSources.properties.get(id),
    allProperties: (
      parent: never,
      args: never,
      context: Context
    ): Promise<Array<PropertyDocument>> => context.dataSources.properties.all(),
  },
  Mutation: {
    createProperty: (
      parent: never,
      { input }: InputArg,
      context: Context
    ): Promise<PropertyDocument> => {
      return context.dataSources.properties.create(input);
    },
    updateProperty: (
      parent: never,
      { id, input }: IdArg & InputArg,
      context: Context
    ): Promise<PropertyDocument | null> => {
      return context.dataSources.properties.update(id, input);
    },
    deleteProperty: (
      parent: never,
      { id }: IdArg,
      context: Context
    ): Promise<string> => context.dataSources.properties.delete(id),
  },
};

export { typeDefs, resolvers };
