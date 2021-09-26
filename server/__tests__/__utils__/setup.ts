import { DataSource } from 'apollo-datasource';
import { ApolloServer } from 'apollo-server';
import PropertiesAPI from '../../src/propertiesAPI.js';
import Property from '../../src/property.js';
import { resolvers, typeDefs } from '../../src/schema.js';
import cloneCollection from './cloneCollection.js';

function setup<T extends Map<string, Property>>(
  collection: T
): { server: ApolloServer; dataSource: DataSource; collection: T } {
  const clonedCollection = cloneCollection(collection);
  const dataSource = new PropertiesAPI(clonedCollection);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      properties: dataSource,
    }),
  });

  return { server, dataSource, collection: clonedCollection };
}

export default setup;
