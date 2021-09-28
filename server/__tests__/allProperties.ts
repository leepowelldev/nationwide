import { ApolloServer, gql } from 'apollo-server';
import { PropertyFields } from '../src/types';
import {
  connectDatabase,
  closeDatabase,
  clearDatabase,
  createApolloServer,
  addPropertiesToDatabase,
  resetIdIncrement,
} from './__utils__/utils';

const query = gql`
  query {
    allProperties {
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

describe('Query: allProperties', () => {
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

  test('should return array of properties', async () => {
    await addPropertiesToDatabase(properties);

    const res = await server.executeOperation({
      query,
    });

    expect(res).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "allProperties": Array [
      Object {
        "_id": "1",
        "address": "A test address",
        "bedrooms": 4,
        "type": "HOUSE",
      },
      Object {
        "_id": "2",
        "address": "Somewhere nice and sunny",
        "bedrooms": 2,
        "type": "FLAT",
      },
    ],
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

  test('should return empty array when no properties exist', async () => {
    const res = await server.executeOperation({
      query,
    });

    expect(res).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "allProperties": Array [],
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
});
