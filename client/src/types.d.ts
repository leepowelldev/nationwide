type PropertyTypes = 'HOUSE' | 'FLAT' | 'BUNGALOW';

type PropertyDocument = {
  _id: string;
  address: string;
  type: PropertyTypes;
  bedrooms: number;
};

type PropertyInput = Omit<PropertyDocument, '_id'>;

export { PropertyTypes, PropertyDocument, PropertyInput };
