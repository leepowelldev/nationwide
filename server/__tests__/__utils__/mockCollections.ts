import Property from '../../src/property.js';

const mockCollection = new Map([
  [
    '1',
    new Property('1', {
      address: 'A test address',
      type: 'house',
      bedrooms: 4,
    }),
  ],
]);

const mockEmptyCollection = new Map();

export { mockCollection, mockEmptyCollection };
