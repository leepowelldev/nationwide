import { VFC } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { Helmet } from 'react-helmet';
import { Layout } from './Layout';

type Props = FallbackProps;

const ErrorFallback: VFC<Props> = ({ error }) => {
  return (
    <Layout>
      <Helmet>
        <title>Error</title>
      </Helmet>
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
      </div>
    </Layout>
  );
};

export { ErrorFallback };
export type { Props as ErrorFallbackProps };
