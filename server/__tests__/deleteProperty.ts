import { ApolloServer, gql } from 'apollo-server';
import { Property } from '../src/propertyModel';
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
  mutation ($id: ID!) {
    deleteProperty(id: $id)
  }
`;

const properties: Array<{ _id: number } & PropertyFields> = [
  { _id: 1, address: 'A test address', type: 'house', bedrooms: 4 },
  { _id: 2, address: 'Somewhere nice and sunny', type: 'flat', bedrooms: 2 },
];

describe('Mutation: deleteProperty', () => {
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

  test('should delete property', async () => {
    // Check collection has correct size
    expect(await Property.count({})).toStrictEqual(properties.length);

    const res = await server.executeOperation({
      query,
      variables: {
        id: 1,
      },
    });

    // Check collection has changed size
    expect(await Property.count({})).toStrictEqual(properties.length - 1);

    expect(res).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "deleteProperty": "1",
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

  test('should error if property does not exist', async () => {
    // Check collection has correct size
    expect(await Property.count({})).toStrictEqual(properties.length);

    const res = await server.executeOperation({
      query,
      variables: {
        id: 3,
      },
    });

    // Check collection has not changed size
    expect(await Property.count({})).toStrictEqual(properties.length);

    expect(res).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "deleteProperty": null,
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
