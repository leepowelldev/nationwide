import { gql, UserInputError } from 'apollo-server';
import { ValidationError } from 'yup';
import PropertiesAPI from './propertiesAPI.js';
import Property, { PropertyArgs } from './property.js';

type IdArg = { id: string };
type InputArg = { input: PropertyArgs };
type GetPropertyArgs = IdArg;
type CreatePropertyArgs = InputArg;
type UpdatePropertyArgs = IdArg & InputArg;
type DeletePropertyArgs = IdArg;

type Context = {
  dataSources: {
    properties: PropertiesAPI;
  };
};

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

  type Query {
    getProperty(id: ID!): Property
    allProperties: [Property]
  }

  type Mutation {
    createProperty(input: PropertyInput!): Property
    updateProperty(id: ID!, input: PropertyInput!): Property
    deleteProperty(id: ID!): ID!
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
      { id }: GetPropertyArgs,
      context: Context
    ): Property => context.dataSources.properties.get(id),
    allProperties: (
      parent: never,
      args: never,
      context: Context
    ): Array<Property> => context.dataSources.properties.all(),
  },
  Mutation: {
    createProperty: (
      parent: never,
      { input }: CreatePropertyArgs,
      context: Context
    ): Property => {
      validateInput(input);
      return context.dataSources.properties.create(input);
    },
    updateProperty: (
      parent: never,
      { id, input }: UpdatePropertyArgs,
      context: Context
    ): Property => {
      validateInput(input);
      return context.dataSources.properties.update(id, input);
    },
    deleteProperty: (
      parent: never,
      { id }: DeletePropertyArgs,
      context: Context
    ): string => context.dataSources.properties.delete(id),
  },
};

function validateInput(input: PropertyArgs) {
  try {
    Property.validate(input);
  } catch (error: any) {
    if (error instanceof ValidationError) {
      throw new UserInputError(error.message);
    }
    // Unknown error
    throw error;
  }
}

export { typeDefs, resolvers };
