import { render, screen } from '@testing-library/react';
import { ErrorFallback } from '../src/components/ErrorFallback';

describe('ErrorFallback Component', () => {
  test('it renders', () => {
    render(
      <ErrorFallback error={new Error()} resetErrorBoundary={() => undefined} />
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('error prop: it renders error message', () => {
    render(
      <ErrorFallback
        error={new Error('Test message')}
        resetErrorBoundary={() => undefined}
      />
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Test message');
  });
});
