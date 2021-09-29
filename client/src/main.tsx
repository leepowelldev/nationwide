import { StrictMode } from 'react';
import { render } from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorFallback } from './components/ErrorFallback';
import { App } from './App';

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_SERVER_URL as string,
  cache: new InMemoryCache(),
});

render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </ErrorBoundary>
  </StrictMode>,
  document.getElementById('root')
);
