import { DataSource } from 'apollo-datasource';
import { v4 as uuid } from 'uuid';
import Property, { PropertyArgs, PropertyType, validate } from './property.js';

class PropertiesDataSource extends DataSource {
  private collection: Map<string, Property>;

  constructor(collection: Map<string, Property>) {
    super();
    this.collection = collection;
  }

  get(id: string): Property {
    const doc = this.collection.get(id);
    if (!doc) {
      throw new Error('Not found');
    }
    return doc;
  }

  all(): Array<Property> {
    const docs = this.collection.values();
    if (!docs) {
      throw new Error('Not found');
    }
    return Array.from(docs);
  }

  create(data: PropertyArgs) {
    const id = uuid();
    const doc = new Property(id, data);
    this.collection.set(id, doc);
    return doc;
  }

  update(id: string, data: PropertyArgs): Property {
    if (!this.collection.get(id)) {
      throw new Error('Not found');
    }
    const doc = new Property(id, data);
    this.collection.set(id, doc);
    return doc;
  }

  delete(id: string) {
    const isSuccess = this.collection.delete(id);

    return !isSuccess
      ? {
          result: 'error',
          error: 'Not found',
        }
      : {
          result: 'success',
          error: null,
        };
  }
}

export default PropertiesDataSource;
