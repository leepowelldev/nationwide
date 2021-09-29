import { gql } from '@apollo/client';

const ALL_PROPERTIES = gql`
  query AllProperties {
    allProperties {
      _id
      address
      type
      bedrooms
    }
  }
`;

const GET_PROPERTY = gql`
  query GetProperty($id: ID!) {
    getProperty(id: $id) {
      _id
      address
      type
      bedrooms
    }
  }
`;

const CREATE_PROPERTY = gql`
  mutation CreateProperty($input: PropertyInput!) {
    createProperty(input: $input) {
      _id
      address
      type
      bedrooms
    }
  }
`;

const UPDATE_PROPERTY = gql`
  mutation UpdateProperty($id: ID!, $input: PropertyInput!) {
    updateProperty(id: $id, input: $input) {
      _id
      address
      type
      bedrooms
    }
  }
`;

const DELETE_PROPERTY = gql`
  mutation DeleteProperty($id: ID!) {
    deleteProperty(id: $id)
  }
`;

export {
  ALL_PROPERTIES,
  GET_PROPERTY,
  CREATE_PROPERTY,
  UPDATE_PROPERTY,
  DELETE_PROPERTY,
};
