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
  mutation ($id: ID!, $input: PropertyInput!) {
    updateProperty(id: $id, input: $input) {
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

describe('Mutation: updateProperty', () => {
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

  test('should update property', async () => {
    const input = {
      address: 'A house somewhere',
      type: 'HOUSE',
      bedrooms: 3,
    };

    const doc = await Property.findById(1);

    // Check document has default data
    expect(doc?.address).toStrictEqual(properties[0].address);
    expect(doc?.type).toStrictEqual(properties[0].type);
    expect(doc?.bedrooms).toStrictEqual(properties[0].bedrooms);

    const res = await server.executeOperation({
      query,
      variables: {
        id: 1,
        input,
      },
    });

    const updatedDoc = await Property.findById(1);

    // Check document has changed
    expect(updatedDoc?.address).toStrictEqual(input.address);
    expect(updatedDoc?.type).toStrictEqual(input.type.toLowerCase());
    expect(updatedDoc?.bedrooms).toStrictEqual(input.bedrooms);

    expect(res).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "updateProperty": Object {
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

  test('should error when property does not exist', async () => {
    const input = {
      address: 'A house somewhere',
      type: 'HOUSE',
      bedrooms: 3,
    };

    const doc = await Property.findById(1);

    // Check document has default data
    expect(doc?.address).toStrictEqual(properties[0].address);
    expect(doc?.type).toStrictEqual(properties[0].type);
    expect(doc?.bedrooms).toStrictEqual(properties[0].bedrooms);

    const res = await server.executeOperation({
      query,
      variables: {
        id: 3,
        input,
      },
    });

    const updatedDoc = await Property.findById(1);

    // Check document has not changed
    expect(updatedDoc?.address).toStrictEqual(properties[0].address);
    expect(updatedDoc?.type).toStrictEqual(properties[0].type);
    expect(updatedDoc?.bedrooms).toStrictEqual(properties[0].bedrooms);

    expect(res).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "updateProperty": null,
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

  test('should error when property address is too short (mongoose schema)', async () => {
    const input = {
      address: 'A hou',
      type: 'HOUSE',
      bedrooms: 3,
    };

    const doc = await Property.findById(1);

    // Check document has default data
    expect(doc?.address).toStrictEqual(properties[0].address);
    expect(doc?.type).toStrictEqual(properties[0].type);
    expect(doc?.bedrooms).toStrictEqual(properties[0].bedrooms);

    const res = await server.executeOperation({
      query,
      variables: {
        id: 1,
        input,
      },
    });

    const updatedDoc = await Property.findById(1);

    // Check document has not changed
    expect(updatedDoc?.address).toStrictEqual(properties[0].address);
    expect(updatedDoc?.type).toStrictEqual(properties[0].type);
    expect(updatedDoc?.bedrooms).toStrictEqual(properties[0].bedrooms);

    expect(res).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "updateProperty": null,
  },
  "errors": Array [
    [GraphQLError: Validation failed: address: Minimum address length is 10],
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

    const doc = await Property.findById(1);

    // Check document has default data
    expect(doc?.address).toStrictEqual(properties[0].address);
    expect(doc?.type).toStrictEqual(properties[0].type);
    expect(doc?.bedrooms).toStrictEqual(properties[0].bedrooms);

    const res = await server.executeOperation({
      query,
      variables: {
        id: 1,
        input,
      },
    });

    const updatedDoc = await Property.findById(1);

    // Check document has not changed
    expect(updatedDoc?.address).toStrictEqual(properties[0].address);
    expect(updatedDoc?.type).toStrictEqual(properties[0].type);
    expect(updatedDoc?.bedrooms).toStrictEqual(properties[0].bedrooms);

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
