import { VFC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback.js';

const App: VFC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div>Hello world</div>
    </ErrorBoundary>
  );
};

export default App;
