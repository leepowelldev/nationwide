import { MouseEventHandler, VFC } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AddPropertyButton } from '../components/AddPropertyButton';
import { Layout } from '../components/Layout';
import { PropertyList } from '../components/PropertyList';
import { useQuery } from '@apollo/client';
import { ALL_PROPERTIES } from '../queries';
import { PropertyDocument } from '../types';

type Data = {
  allProperties: Array<PropertyDocument>;
};

const HomePage: VFC = () => {
  const history = useHistory();

  /**
   * Fetch properties data
   */

  const { data, error, loading } = useQuery<Data>(ALL_PROPERTIES);

  /**
   * Handlers
   */

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    history.push('/create');
  };

  return (
    <Layout showGlobalLoading={loading}>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {(() => {
        if (loading) {
          return (
            <div className="text-center">
              Please wait, loading properties...
            </div>
          );
        }

        if (error) {
          const message = <div>Error loading properties.</div>;
          if (import.meta.env.DEV) {
            return (
              <>
                {message}
                <div>{JSON.stringify(error)}</div>
              </>
            );
          }
          return message;
        }

        return (
          <>
            <PropertyList properties={data?.allProperties} />
            <AddPropertyButton onClick={handleClick} />
          </>
        );
      })()}
    </Layout>
  );
};

export { HomePage };
