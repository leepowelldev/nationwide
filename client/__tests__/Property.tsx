import { fireEvent, render, screen } from '@testing-library/react';
import { useMutation } from '@apollo/client';
import { Property, PropertyProps } from '../src/components/Property';

const mutationHandler = jest.fn();

jest.mock('@apollo/client', () => ({
  useMutation: jest.fn(() => [mutationHandler, {}]),
  gql: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  Link: jest.fn(({ children, to }) => {
    return <a href={to}>{children}</a>;
  }),
}));

const props: PropertyProps = {
  id: '1',
  address: 'A house on the hill',
  type: 'FLAT',
  bedrooms: 2,
};

describe('Property Component', () => {
  test('it renders', () => {
    render(<Property {...props} />);

    expect(
      screen.getByText(new RegExp(`address: ${props.address}`, 'i'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`type: ${props.type}`, 'i'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`bedrooms: ${props.bedrooms}`, 'i'))
    ).toBeInTheDocument();
  });

  test('it should call mutation handler when delete button clicks', () => {
    render(<Property {...props} />);

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    expect(mutationHandler).toHaveBeenCalled();
  });

  test('it should render loading indicator when mutation is in flight', () => {
    (useMutation as jest.Mock).mockImplementationOnce(() => [
      mutationHandler,
      {
        loading: true,
        error: undefined,
        data: undefined,
      },
    ]);

    render(<Property {...props} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('it should render error message when mutation has failed', () => {
    (useMutation as jest.Mock).mockImplementationOnce(() => [
      mutationHandler,
      {
        loading: false,
        error: new Error(),
        data: undefined,
      },
    ]);

    render(<Property {...props} />);

    expect(screen.getByRole('alert')).toHaveTextContent(
      /error deleting property/i
    );
  });

  test('it should render render an edit link', () => {
    render(<Property {...props} />);

    expect(screen.getByRole('link')).toHaveTextContent(/edit/i);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `/edit/${props.id}`
    );
  });
});
