import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { AddPropertyButton } from '../src/components/AddPropertyButton';

describe('AddPropertyButton Component', () => {
  test('it renders', () => {
    const spy = jest.fn();

    render(<AddPropertyButton onClick={spy} />);

    expect(
      screen.getByRole('button', { name: /add property/i })
    ).toBeInTheDocument();
  });

  test('it calls onClick handler when clicked', () => {
    const spy = jest.fn();

    render(<AddPropertyButton onClick={spy} />);

    fireEvent.click(screen.getByRole('button', { name: /add property/i }));

    expect(spy).toHaveBeenCalled();
  });
});
