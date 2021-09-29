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
      {properties.map((property) => (
        <ListItem divider key={property._id}>
          <div className="property-wrapper">
            <Property {...property} />
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export { PropertyList };
