import { useMutation, useQuery } from '@apollo/client';
import { Save } from '@mui/icons-material';
import { Link as MuiLink } from '@mui/material';
import { VFC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { PropertyForm } from '../components/PropertyForm';
import { GET_PROPERTY, UPDATE_PROPERTY } from '../queries';
import { PropertyDocument, PropertyInput } from '../types';

type QueryData = {
  getProperty: PropertyDocument;
};

type MutationData = {
  updateProperty: PropertyDocument;
};

type MutationVariables = {
  id: string;
  input: PropertyInput;
};

const EditPage: VFC = () => {
  const history = useHistory();

  const { id } = useParams<{ id: string }>();

  /**
   * Fetch property data
   */

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery<QueryData>(GET_PROPERTY, {
    variables: { id },
  });

  /**
   * Update property mutator
   */

  const [
    updateProperty,
    {
      data: mutationData,
      loading: mutationLoading,
      error: mutationError,
      called: mutationCalled,
    },
  ] = useMutation<MutationData, MutationVariables>(UPDATE_PROPERTY, {
    refetchQueries: ['AllProperties'],
  });

  /**
   * Handlers
   */

  const handleCancel = () => {
    history.push('/');
  };

  const handleSubmit = (data: PropertyInput) => {
    const initialData = queryData?.getProperty;

    const shouldUpdate = (() => {
      if (!initialData) {
        return true;
      }

      return Object.keys(initialData).reduce((acc, key) => {
        if (key === '__typename' || key == '_id') {
          return acc;
        }

        if (
          acc === true ||
          data[key as keyof PropertyInput] !==
            initialData[key as keyof PropertyDocument]
        ) {
          return true;
        }

        return acc;
      }, false);
    })();

    if (shouldUpdate) {
      // Update if fields have changed
      updateProperty({
        variables: {
          id,
          input: data,
        },
      });
    } else {
      // Otherwise redirect back home
      history.push('/');
    }
  };

  /**
   * Effects
   */

  // Redirect to homepage if updated successfully
  useEffect(() => {
    if (mutationData && !mutationLoading && !mutationError && mutationCalled) {
      history.push('/');
    }
  });

  const { address, type, bedrooms } = queryData?.getProperty || {};

  const isLoading = queryLoading;

  return (
    <Layout showGlobalLoading={isLoading}>
      <Helmet>
        <title>Edit Property</title>
      </Helmet>
      {(() => {
        if (queryError) {
          if (queryError.message === 'Not found') {
            return (
              <div className="text-center">
                <p>Property not found</p>
                <Link to="/">
                  <MuiLink component="span">Back to home</MuiLink>
                </Link>
              </div>
            );
          }
          // Unknown error, throw to let the error boundary handle
          throw queryError;
        }

        // Show a disabled placeholder form until data is loaded
        return isLoading ? (
          <PropertyForm
            disabled={true}
            key="disabled-form"
            saveButtonIcon={<Save />}
            saveButtonText={'Update'}
          />
        ) : (
          <PropertyForm
            defaultAddress={address}
            defaultBedrooms={bedrooms}
            defaultType={type}
            disabled={isLoading}
            key="active-form"
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            saveButtonIcon={<Save />}
            saveButtonText={'Update'}
          />
        );
      })()}
    </Layout>
  );
};

export { EditPage };
