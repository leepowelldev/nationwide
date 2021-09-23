import db from './db.js';

type PropertyType = 'house' | 'flat';

class Property {
  readonly id: string;
  address: string;
  type: PropertyType;

  constructor(
    id: string,
    { address, type }: { address: string; type: PropertyType }
  ) {
    this.id = id;
    this.address = address;
    this.type = type;
  }

  static get = (id: string) => ({});

  static all = () => [];

  static update = (id: string) => ({});

  static remove = (id: string) => {
    return {
      result: 'success',
      error: null,
    };
  };
}

export default Property;
