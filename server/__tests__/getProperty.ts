import { ApolloServer, gql } from 'apollo-server';
import { PropertyFields } from '../src/types';
import {
  connectDatabase,
  closeDatabase,
  clearDatabase,
  createApolloServer,
  resetIdIncrement,
  addPropertiesToDatabase,
} from './__utils__/utils';

const query = gql`
  query ($id: ID!) {
    getProperty(id: $id) {
      _id
      address
      type
      bedrooms
    }
  }
`;

const properties: Array<{ _id: number } & PropertyFields> = [
  { _id: 1, address: 'A test address', type: 'house', bedrooms: 4 },
  { _id: 2, address: 'Somewhere nice and sunny', type: 'flat', bedrooms: 2 },
];

describe('Query: getProperty', () => {
  let server: ApolloServer;

  beforeAll(async () => {
    resetIdIncrement();
    await connectDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    server = createApolloServer();
    await addPropertiesToDatabase(properties);
  });

  afterEach(async () => await clearDatabase());

  test('should return property', async () => {
    const res = await server.executeOperation({
      query,
      variables: { id: 1 },
    });

    expect(res).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "getProperty": Object {
      "_id": "1",
      "address": "A test address",
      "bedrooms": 4,
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

  test('should error when property does not exist', async () => {
    const res = await server.executeOperation({
      query,
      variables: { id: 3 },
    });

    expect(res).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "getProperty": null,
  },
  "errors": Array [
    [GraphQLError: Not found],
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
