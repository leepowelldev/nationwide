import { gql } from 'apollo-server';
import { mockCollection } from './__utils__/mockCollections.js';
import setup from './__utils__/setup.js';

const query = gql`
  mutation ($id: ID!) {
    deleteProperty(id: $id)
  }
`;

describe('Mutation: deleteProperty', () => {
  test('should delete property', async () => {
    const { server, collection } = setup(mockCollection);
    const id = '1';

    // Check collection has default size
    expect(collection.size).toStrictEqual(mockCollection.size);

    const res = await server.executeOperation({
      query,
      variables: {
        id,
      },
    });

    // Check collection has changed size
    expect(collection.size).toStrictEqual(0);
    expect(res).toMatchSnapshot();
  });

  test('should error if property does not exist', async () => {
    const { server, collection } = setup(mockCollection);
    const id = '2';

    // Check collection has default size
    expect(collection.size).toStrictEqual(1);

    const res = await server.executeOperation({
      query,
      variables: {
        id,
      },
    });

    // Check collection has not changed size
    expect(collection.size).toStrictEqual(1);
    expect(JSON.stringify(res.errors?.[0])).toMatchSnapshot();
    expect(res).toMatchSnapshot();
  });
});
