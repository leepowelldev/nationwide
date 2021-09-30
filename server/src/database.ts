import mongoose from 'mongoose';
import type { Mongoose } from 'mongoose';

const url = process.env.MONGO_URL || 'mongodb://localhost:27017/';
const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;
const dbName = 'nationwide';

// Queries should return the updated document rather than the original
// https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndUpdate
mongoose.set('returnOriginal', false);

const init = async (): Promise<Mongoose> => {
  try {
    const connection = await mongoose.connect(url, {
      user,
      pass,
      dbName,
    });
    return connection;
  } catch (error: any) {
    console.log('Error: Could not connect to database');
    console.log(error);
    process.exit(1);
  }
};

export { init };
