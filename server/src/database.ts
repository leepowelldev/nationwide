import { Low, Memory } from 'lowdb';
import Property from './property.js';

type Data = {
  properties: Map<string, Property>;
};

const adapter = new Memory<Data>();
const database = new Low<Data>(adapter);

await database.read();

database.data ||= { properties: new Map() };

export default database;
