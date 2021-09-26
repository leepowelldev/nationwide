import { gql } from 'apollo-server';
import {
  mockCollection,
  mockEmptyCollection,
} from './__utils__/mockCollections.js';
import setup from './__utils__/setup.js';

const query = gql`
  query {
    allProperties {
      id
      address
      type
      bedrooms
    }
  }
`;

describe('Query: allProperties', () => {
  test('should return array of properties', async () => {
    const { server } = setup(mockCollection);

    const res = await server.executeOperation({
      query,
    });

    expect(res).toMatchSnapshot();
  });

  test('should return empty array when no properties exist', async () => {
    const { server } = setup(mockEmptyCollection);

    const res = await server.executeOperation({
      query,
    });

    expect(res).toMatchSnapshot();
  });
});
