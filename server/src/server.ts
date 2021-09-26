import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './schema.js';
import PropertiesAPI from './propertiesAPI.js';
import database from './database.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    if (database.data === null) {
      console.log('Database data not found');
      process.exit(1);
    }

    return {
      properties: new PropertiesAPI(database.data.properties),
    };
  },
  cors: {
    origin: '*',
  },
});

const { url } = await server.listen({
  port: process.env.PORT || 4000,
});

console.log(`🚀 Server ready at ${url}`);
