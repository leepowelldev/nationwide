import { DataSource } from 'apollo-datasource';
import { v4 as uuid } from 'uuid';
import { NotFoundError } from './errors.js';
import Property, { PropertyArgs } from './property.js';

class PropertiesAPI extends DataSource {
  private collection: Map<string, Property>;

  constructor(collection: Map<string, Property>) {
    super();
    this.collection = collection;
  }

  get(id: string): Property {
    const doc = this.collection.get(id);
    if (!doc) {
      throw new NotFoundError(`property with id ${id} does not exist`);
    }
    return doc;
  }

  all(): Array<Property> {
    return Array.from(this.collection.values());
  }

  create(data: PropertyArgs): Property {
    const id = uuid();
    const doc = new Property(id, data);
    // TODO check id doesn't already exist - unlikely
    this.collection.set(id, doc);
    return doc;
  }

  update(id: string, data: PropertyArgs): Property {
    if (!this.collection.get(id)) {
      throw new NotFoundError(`property with id ${id} does not exist`);
    }
    const doc = new Property(id, data);
    this.collection.set(id, doc);
    return doc;
  }

  delete(id: string): string {
    if (!this.collection.get(id)) {
      throw new NotFoundError(`property with id ${id} does not exist`);
    }
    this.collection.delete(id);
    return id;
  }
}

export default PropertiesAPI;
