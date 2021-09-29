import { List, ListItem } from '@mui/material';
import { VFC } from 'react';
import { PropertyDocument } from '../types';
import { Property } from './Property';

type Props = {
  properties?: Array<PropertyDocument>;
};

const PropertyList: VFC<Props> = ({ properties = [] }) => {
  if (properties.length === 0) {
    return <div>No properties found.</div>;
  }

  return (
    <List>
      {properties.map(({ _id: id, ...props }) => (
        <ListItem divider key={id}>
          <div className="property-wrapper">
            <Property {...props} id={id} />
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export { PropertyList };
export type { Props as PropertyListProps };
