import { ApolloServer } from 'apollo-server';
import { Collection } from 'apollo-datasource-mongodb';
import { resolvers, typeDefs } from './schema';
import { PropertiesDataSource } from './propertiesDataSource';
import { Property } from './propertyModel';
import { PropertyDocument } from './types';
import { init } from './database';

init().then(() => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      properties: new PropertiesDataSource(
        // TODO work out types conflict 🤔
        Property as unknown as Collection<PropertyDocument>
      ),
    }),
    cors: {
      origin: '*',
    },
  });

  server
    .listen({
      port: process.env.PORT || 4000,
    })
    .then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    });
});
