import { useMutation } from '@apollo/client';
import { Delete, Edit, ErrorOutline } from '@mui/icons-material';
import { Button, LinearProgress } from '@mui/material';
import { MouseEventHandler, VFC } from 'react';
import { Link } from 'react-router-dom';
import { DELETE_PROPERTY } from '../queries';
import { PropertyDocument } from '../types';

type Props = { id: string } & Omit<PropertyDocument, '_id'>;

const Property: VFC<Props> = ({ id, address, type, bedrooms }) => {
  const [deleteProperty, { error, loading }] = useMutation(DELETE_PROPERTY, {
    refetchQueries: ['AllProperties'],
  });

  const handleDelete: MouseEventHandler<HTMLButtonElement> = () => {
    deleteProperty({ variables: { id } });
  };

  const errorMessage = (
    <div className="text-red-800 mb-2" role="alert">
      <ErrorOutline className="mr-1 -mt-1" />
      Error deleting property
    </div>
  );

  return (
    <div className="property">
      {loading && <LinearProgress />}
      {error && errorMessage}
      <div>Address: {address}</div>
      <div>Type: {type.toLowerCase()}</div>
      <div>Bedrooms: {bedrooms}</div>
      <div className="property__controls">
        <div className="property_control-wrapper property_control-wrapper--first">
          <Button
            className="property__control"
            color="error"
            disabled={loading}
            fullWidth
            onClick={handleDelete}
            startIcon={<Delete />}
            variant="contained"
          >
            Delete
          </Button>
        </div>
        <div className="property_control-wrapper property_control-wrapper--last">
          <Link to={`/edit/${id}`}>
            <Button
              className="property__control"
              component={'span'}
              disabled={loading}
              fullWidth
              startIcon={<Edit />}
              variant="contained"
            >
              Edit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Property };
export type { Props as PropertyProps };
