import { List, ListItem } from '@mui/material';
import { Property } from './Property';
import type { VFC } from 'react';
import type { PropertyDocument } from '../types';

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
