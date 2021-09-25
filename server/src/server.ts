import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './schema.js';
import PropertiesDataSource from './propertiesDataSource.js';
import database from './database.js';
import Property from './property.js';

// Properties data collection
if (database.data) {
  database.data.properties = new Map<string, Property>();
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    properties: new PropertiesDataSource(database.data?.properties),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
