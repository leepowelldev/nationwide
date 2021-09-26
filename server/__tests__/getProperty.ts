import { gql } from 'apollo-server';
import { mockCollection } from './__utils__/mockCollections.js';
import setup from './__utils__/setup.js';

const query = gql`
  query ($id: ID!) {
    getProperty(id: $id) {
      id
      address
      type
      bedrooms
    }
  }
`;

describe('Query: getProperty', () => {
  test('should return property', async () => {
    const { server } = setup(mockCollection);

    const res = await server.executeOperation({
      query,
      variables: { id: '1' },
    });

    expect(res).toMatchSnapshot();
  });

  test('should error when property does not exist', async () => {
    const { server } = setup(mockCollection);

    const res = await server.executeOperation({
      query,
      variables: { id: '2' },
    });

    expect(JSON.stringify(res.errors?.[0])).toMatchSnapshot();
    expect(res).toMatchSnapshot();
  });
});
