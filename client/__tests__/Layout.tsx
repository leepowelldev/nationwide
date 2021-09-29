import { render, screen } from '@testing-library/react';
import { Layout } from '../src/components/Layout';

describe('Layout Component', () => {
  test('it renders', () => {
    render(<Layout />);

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
  });

  test('children prop: it renders children', () => {
    render(
      <Layout>
        <h1>Test heading</h1>
      </Layout>
    );

    expect(
      screen.getByRole('heading', { name: /test heading/i })
    ).toBeInTheDocument();
  });

  test('showGlobalLoading prop: it displays loading indicator', () => {
    render(<Layout showGlobalLoading />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
