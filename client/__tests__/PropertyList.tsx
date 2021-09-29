import { render, screen } from '@testing-library/react';
import { PropertyList } from '../src/components/PropertyList';

jest.mock('../src/components/Property.tsx', () => ({
  Property: jest.fn(() => null),
}));

describe('PropertyList Component', () => {
  test('it renders', () => {
    render(<PropertyList />);

    expect(screen.getByText(/No properties found./i)).toBeInTheDocument();
  });

  test('properties prop: it renders a list of properties', () => {
    const properties = [
      {
        _id: '1',
        address: 'A house',
        type: 'HOUSE' as const,
        bedrooms: 3,
      },
      {
        _id: '2',
        address: 'A flat',
        type: 'FLAT' as const,
        bedrooms: 2,
      },
    ];

    render(<PropertyList properties={properties} />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
