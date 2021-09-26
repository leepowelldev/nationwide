import * as yup from 'yup';

type PropertyType = 'house' | 'flat' | 'bungalow';
type PropertyArgs = { address: string; type: PropertyType; bedrooms: number };

const validationSchema = yup.object().shape({
  address: yup.string().min(10).max(200).required(),
  type: yup
    .string()
    .matches(/^(flat|house|bungalow)$/, {
      message: 'type must be `house` or `flat`',
    })
    .required(),
  bedrooms: yup.number().min(1).required(),
});

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

  static validate = (property: Record<string, any>): any =>
    validationSchema.validateSync(property);
}

export default Property;
export type { PropertyArgs, PropertyType };
