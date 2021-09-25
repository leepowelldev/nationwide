import * as yup from 'yup';

type PropertyType = 'house' | 'flat' | 'bungalow';

type PropertyArgs = { address: string; type: PropertyType; bedrooms: number };

class Property {
  readonly id: string;
  address: string;
  type: PropertyType;
  bedrooms: number;

  constructor(id: string, { address, type, bedrooms }: PropertyArgs) {
    this.id = id;
    this.address = address;
    this.type = type;
    this.bedrooms = bedrooms;
  }
}

const schema = yup.object().shape({
  address: yup.string().min(10).max(200),
  type: yup.string().matches(/^(flat|house)$/, {
    message: 'type must be `house` or `flat`',
  }),
  bedrooms: yup.number().min(1),
});

const validate = (property: Record<string, any>): any =>
  schema.validateSync(property);

export default Property;
export { validate };
export type { PropertyArgs, PropertyType };
