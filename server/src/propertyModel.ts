import mongoose from 'mongoose';
import { PropertyFields } from './types';

const schema = new mongoose.Schema<PropertyFields>({
  address: {
    type: String,
    minLength: [10, 'Minimum address length is 10'],
    required: true,
  },
  type: {
    type: String,
    enum: ['house', 'flat', 'bungalow'],
    required: true,
  },
  bedrooms: {
    type: Number,
    min: [1, 'Minimum number of bedrooms is 1'],
    required: true,
  },
});

const Property = mongoose.model<PropertyFields>(
  'property',
  schema,
  'properties'
);

export { Property, schema };
