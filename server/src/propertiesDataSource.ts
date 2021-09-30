import mongoose from 'mongoose';
import { MongoDataSource } from 'apollo-datasource-mongodb';
import { UserInputError } from 'apollo-server-errors';
import { Property } from './propertyModel';
import { NotFoundError } from './errors';
import type { PropertyDocument, PropertyFields } from './types';

class PropertiesDataSource extends MongoDataSource<PropertyDocument> {
  async get(id: string): Promise<PropertyDocument> {
    const doc = await this.findOneById(id);
    if (!doc) {
      throw new NotFoundError();
    }
    return doc;
  }

  async all(): Promise<Array<PropertyDocument>> {
    return await this.collection.find({}).toArray();
  }

  async create(data: PropertyFields): Promise<PropertyDocument> {
    try {
      return await new Property(data).save();
    } catch (error: any) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new UserInputError(error.message);
      }
      throw error;
    }
  }

  async update(id: string, data: PropertyFields): Promise<PropertyDocument> {
    try {
      const doc = await Property.findByIdAndUpdate(id, data, {
        runValidators: true,
      }).exec();
      if (!doc) {
        throw new NotFoundError();
      }
      return doc;
    } catch (error: any) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new UserInputError(error.message);
      }
      throw error;
    }
  }

  async delete(id: string): Promise<string> {
    const doc = await Property.findByIdAndDelete(id).exec();
    if (!doc) {
      throw new NotFoundError();
    }
    return doc.id;
  }
}

export { PropertiesDataSource };
