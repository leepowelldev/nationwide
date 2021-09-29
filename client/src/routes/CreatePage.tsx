import { useMutation } from '@apollo/client';
import { Save } from '@mui/icons-material';
import { VFC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router';
import { Layout } from '../components/Layout';
import { PropertyForm } from '../components/PropertyForm';
import { CREATE_PROPERTY } from '../queries';
import { PropertyDocument, PropertyInput } from '../types';

type Data = {
  createProperty: PropertyDocument;
};

type Variables = {
  input: PropertyInput;
};

const CreatePage: VFC = () => {
  const history = useHistory();

  /**
   * Delete property mutator
   */

  const [addProperty, { data, loading, error, called }] = useMutation<
    Data,
    Variables
  >(CREATE_PROPERTY, {
    refetchQueries: ['AllProperties'],
  });

  /**
   * Handlers
   */

  const handleCancel = () => {
    history.push('/');
  };

  const handleSubmit = (data: PropertyInput) => {
    addProperty({
      variables: {
        input: data,
      },
    });
  };

  /**
   * Effects
   */

  // Redirect to homepage if updated successfully
  useEffect(() => {
    if (data && !loading && !error && called) {
      history.push('/');
    }
  });

  return (
    <Layout>
      <Helmet>
        <title>Create Property</title>
      </Helmet>
      {error && <div>Error - could not create property.</div>}
      <PropertyForm
        disabled={loading}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        saveButtonIcon={<Save />}
        saveButtonText={'Create'}
      />
    </Layout>
  );
};

export { CreatePage };
