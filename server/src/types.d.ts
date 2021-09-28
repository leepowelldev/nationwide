import { ObjectId } from 'mongodb';

type PropertyTypes = 'house' | 'bungalow' | 'flat';

type PropertyFields = {
  address: string;
  type: PropertyTypes;
  bedrooms: number;
};

type PropertyDocument = {
  _id: ObjectId;
} & PropertyFields;

export { PropertyFields, PropertyDocument, PropertyTypes };
