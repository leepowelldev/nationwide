import { Low, Memory } from 'lowdb';

type Data = Record<string, any>;

const adapter = new Memory<Data>();
const database = new Low<Data>(adapter);

database.data = {};

export default database;
