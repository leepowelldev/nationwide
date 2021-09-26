import { gql } from 'apollo-server';
import { mockEmptyCollection } from './__utils__/mockCollections.js';
import setup from './__utils__/setup.js';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'XXXXX-XXXXX-XXXXX'),
}));

const query = gql`
  mutation ($input: PropertyInput!) {
    createProperty(input: $input) {
      id
      address
      type
      bedrooms
    }
  }
`;

describe('Mutation: createProperty', () => {
  test('should create property', async () => {
    const { server, collection } = setup(mockEmptyCollection);
    const input = {
      address: 'A house somewhere',
      type: 'HOUSE',
      bedrooms: 3,
    };

    // Check collection has default size
    expect(collection.size).toStrictEqual(0);

    const res = await server.executeOperation({
      query,
      variables: {
        input,
      },
    });

    // Check collection has changed size
    expect(collection.size).toStrictEqual(1);
    expect(res).toMatchSnapshot();
  });

  test('should error when property address is too short (yup schema)', async () => {
    const { server, collection } = setup(mockEmptyCollection);

    // Check collection has default size
    expect(collection.size).toStrictEqual(0);

    const res = await server.executeOperation({
      query,
      variables: {
        input: {
          address: 'A hou',
          type: 'HOUSE',
          bedrooms: 3,
        },
      },
    });

    // Check collection has not changed size
    expect(collection.size).toStrictEqual(0);
    expect(JSON.stringify(res.errors?.[0])).toMatchSnapshot();
    expect(res).toMatchSnapshot();
  });

  test('should error when property input is missing field (internal)', async () => {
    const { server, collection } = setup(mockEmptyCollection);

    expect(collection.size).toStrictEqual(0);

    const res = await server.executeOperation({
      query,
      variables: {
        input: {
          address: 'A house somewhere',
          bedrooms: 3,
        },
      },
    });

    expect(collection.size).toStrictEqual(0);
    expect(JSON.stringify(res.errors?.[0])).toMatchSnapshot();
    expect(res).toMatchSnapshot();
  });
});
