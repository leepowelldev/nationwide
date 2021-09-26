import { VFC } from 'react';
import { FallbackProps } from 'react-error-boundary';

type Props = FallbackProps;

const ErrorFallback: VFC<Props> = ({ error }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
};

export default ErrorFallback;
export type { Props as ErrorFallbackProps };
