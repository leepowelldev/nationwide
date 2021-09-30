import { gql } from 'apollo-server';
import { Property } from '../src/propertyModel';
import {
  clearDatabase,
  closeDatabase,
  connectDatabase,
  createApolloServer,
  resetIdIncrement,
} from './__utils__/utils';
import type { ApolloServer } from 'apollo-server';

const query = gql`
  mutation ($input: PropertyInput!) {
    createProperty(input: $input) {
      _id
      address
      type
      bedrooms
    }
  }
`;

describe('Mutation: createProperty', () => {
  let server: ApolloServer;

  beforeAll(async () => {
    resetIdIncrement();
    await connectDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(() => {
    server = createApolloServer();
  });

  afterEach(async () => await clearDatabase());

  test('should create property', async () => {
    const input = {
      address: 'A house somewhere',
      type: 'HOUSE',
      bedrooms: 3,
    };

    // Check collection is empty
    expect(await Property.count({})).toStrictEqual(0);

    const res = await server.executeOperation({
      query,
      variables: {
        input,
      },
    });

    // Check property has been added to collection
    expect(await Property.count()).toStrictEqual(1);

    expect(res).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "createProperty": Object {
            "_id": "1",
            "address": "A house somewhere",
            "bedrooms": 3,
            "type": "HOUSE",
          },
        },
        "errors": undefined,
        "extensions": undefined,
        "http": Object {
          "headers": Headers {
            Symbol(map): Object {},
          },
        },
      }
    `);
  });

  test('should error when property address is too short (mongoose schema)', async () => {
    const input = {
      address: 'A hou',
      type: 'HOUSE',
      bedrooms: 3,
    };

    // Check collection is empty
    expect(await Property.count({})).toStrictEqual(0);

    const res = await server.executeOperation({
      query,
      variables: {
        input,
      },
    });

    // Check property has not been added to collection
    expect(await Property.count({})).toStrictEqual(0);

    expect(res).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "createProperty": null,
        },
        "errors": Array [
          [GraphQLError: property validation failed: address: Minimum address length is 10],
        ],
        "extensions": undefined,
        "http": Object {
          "headers": Headers {
            Symbol(map): Object {},
          },
        },
      }
    `);
  });

  test('should error when property input is missing field (internal)', async () => {
    const input = {
      address: 'A house somewhere',
      bedrooms: 3,
    };

    // Check collection is empty
    expect(await Property.count({})).toStrictEqual(0);

    const res = await server.executeOperation({
      query,
      variables: {
        input,
      },
    });

    // Check property has not been added to collection
    expect(await Property.count({})).toStrictEqual(0);

    expect(res).toMatchInlineSnapshot(`
      Object {
        "data": undefined,
        "errors": Array [
          [UserInputError: Variable "$input" got invalid value { address: "A house somewhere", bedrooms: 3 }; Field "type" of required type "PropertyType!" was not provided.],
        ],
        "extensions": undefined,
        "http": Object {
          "headers": Headers {
            Symbol(map): Object {},
          },
        },
      }
    `);
  });
});
