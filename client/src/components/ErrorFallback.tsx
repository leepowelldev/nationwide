import { Helmet } from 'react-helmet';
import { Layout } from './Layout';
import type { VFC } from 'react';
import type { FallbackProps } from 'react-error-boundary';

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
