import { Low, Memory } from 'lowdb';
import Property from './property.js';

const db = new Low(new Memory<{ properties: Map<string, Property> }>());

await db.read();

db.data ||= { properties: new Map() };

export default db;
