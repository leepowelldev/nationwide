import { gql } from 'apollo-server';
import { mockCollection } from './__utils__/mockCollections.js';
import setup from './__utils__/setup.js';

const query = gql`
  mutation ($id: ID!, $input: PropertyInput!) {
    updateProperty(id: $id, input: $input) {
      id
      address
      type
      bedrooms
    }
  }
`;

describe('Mutation: updateProperty', () => {
  test('should update property', async () => {
    const { server, collection } = setup(mockCollection);
    const input = {
      address: 'A house somewhere',
      type: 'HOUSE',
      bedrooms: 3,
    };

    // Check collection has default data
    expect(collection.get('1')?.address).toStrictEqual(
      mockCollection.get('1')?.address
    );
    expect(collection.get('1')?.bedrooms).toStrictEqual(
      mockCollection.get('1')?.bedrooms
    );

    const res = await server.executeOperation({
      query,
      variables: {
        id: '1',
        input,
      },
    });

    // Check collection has changed data
    expect(collection.get('1')?.address).toStrictEqual(input.address);
    expect(collection.get('1')?.bedrooms).toStrictEqual(input.bedrooms);
    expect(res).toMatchSnapshot();
  });

  test('should error when property does not exist', async () => {
    const { server, collection } = setup(mockCollection);
    const input = {
      address: 'A house somewhere',
      type: 'HOUSE',
      bedrooms: 3,
    };

    // Check collection has default data
    expect(collection.get('1')?.address).toStrictEqual(
      mockCollection.get('1')?.address
    );
    expect(collection.get('1')?.bedrooms).toStrictEqual(
      mockCollection.get('1')?.bedrooms
    );

    const res = await server.executeOperation({
      query,
      variables: {
        id: '2',
        input,
      },
    });

    // Check collection has not changed data
    expect(collection.get('1')?.address).toStrictEqual(
      mockCollection.get('1')?.address
    );
    expect(collection.get('1')?.bedrooms).toStrictEqual(
      mockCollection.get('1')?.bedrooms
    );
    expect(JSON.stringify(res.errors?.[0])).toMatchSnapshot();
    expect(res).toMatchSnapshot();
  });

  test('should error when property address is too short (yup schema)', async () => {
    const { server, collection } = setup(mockCollection);
    const input = {
      address: 'A hou',
      type: 'HOUSE',
      bedrooms: 3,
    };

    // Check collection has default data
    expect(collection.get('1')?.address).toStrictEqual(
      mockCollection.get('1')?.address
    );
    expect(collection.get('1')?.bedrooms).toStrictEqual(
      mockCollection.get('1')?.bedrooms
    );

    const res = await server.executeOperation({
      query,
      variables: {
        id: '1',
        input,
      },
    });

    // Check collection has not changed data
    expect(collection.get('1')?.address).toStrictEqual(
      mockCollection.get('1')?.address
    );
    expect(collection.get('1')?.bedrooms).toStrictEqual(
      mockCollection.get('1')?.bedrooms
    );
    expect(JSON.stringify(res.errors?.[0])).toMatchSnapshot();
    expect(res).toMatchSnapshot();
  });

  test('should error when property input is missing field (internal)', async () => {
    const { server, collection } = setup(mockCollection);
    const input = {
      address: 'A house somewhere',
      bedrooms: 3,
    };

    // Check collection has default data
    expect(collection.get('1')?.address).toStrictEqual(
      mockCollection.get('1')?.address
    );
    expect(collection.get('1')?.bedrooms).toStrictEqual(
      mockCollection.get('1')?.bedrooms
    );

    const res = await server.executeOperation({
      query,
      variables: {
        id: '1',
        input,
      },
    });

    // Check collection has not changed data
    expect(collection.get('1')?.address).not.toStrictEqual(input.address);
    expect(collection.get('1')?.bedrooms).not.toStrictEqual(input.bedrooms);
    expect(JSON.stringify(res.errors?.[0])).toMatchSnapshot();
    expect(res).toMatchSnapshot();
  });
});
