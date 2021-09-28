/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import mongoose, { ConnectOptions } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ApolloServer } from 'apollo-server';
import { Collection } from 'apollo-datasource-mongodb';
import { PropertiesDataSource } from '../../src/propertiesDataSource';
import { resolvers, typeDefs } from '../../src/schema';
import { PropertyDocument, PropertyFields } from '../../src/types';
import { Property } from '../../src/propertyModel';

let mongod: MongoMemoryServer;

// Queries should return the updated document rather than the original
// https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndUpdate
mongoose.set('returnOriginal', false);

let counter = 1;

Property.schema.add({
  _id: {
    type: Number,
    default: () => counter++,
  },
});

const resetIdIncrement = () => (counter = 1);

const connectDatabase = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'nationwide',
  };

  await mongoose.connect(uri, mongooseOpts as ConnectOptions);
};

const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

const createApolloServer = () => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      properties: new PropertiesDataSource(
        Property as unknown as Collection<PropertyDocument>
      ),
    }),
  });
};

const addPropertiesToDatabase = async (properties: Array<PropertyFields>) => {
  return Promise.all(
    properties.map(async (property) => {
      await Property.create(property);
    })
  );
};

export {
  resetIdIncrement,
  connectDatabase,
  closeDatabase,
  clearDatabase,
  createApolloServer,
  addPropertiesToDatabase,
};
