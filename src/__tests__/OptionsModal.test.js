import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import OptionsModal from '../Components/OptionsModal';

const initialOptions = {
  type: 'Dog',
  age: {
    baby: true,
    young: true,
    adult: true,
    senior: true,
  },
};

const testAgeClick = (age) => {
const query = screen.getByRole('checkbox', { name: age });
expect(query.checked).toEqual(true);
userEvent.click(query);
expect(query.checked).toEqual(false);
userEvent.click(query);
expect(query.checked).toEqual(true);
}

describe('OptionsModal', () => {
  test('should have heading', () => {
    render(<OptionsModal open={true} initialOptions={initialOptions} />);
    const query = screen.getByRole('heading', { name: /paws for pals/i });
    expect(query).toBeInTheDocument();  
  });
  test('should have sub-heading', () => {
    render(<OptionsModal open={true} initialOptions={initialOptions} />);
    const query = screen.getByRole('heading', { name: /find your new best friend/i });
    expect(query).toBeInTheDocument();
  });
  test('should have type selection', () => {
    render(<OptionsModal open={true} initialOptions={initialOptions} />);
    const query = screen.getByRole('radiogroup', { name: /type/i });
    const dog = screen.getByRole('radio', { name: /dog/i });
    const cat = screen.getByRole('radiogroup', { name: /cat/i });
    expect(query).toBeInTheDocument();
    expect(dog).toBeInTheDocument();
    expect(cat).toBeInTheDocument();
  });
  test('should have age selection', () => {
    render(<OptionsModal open={true} initialOptions={initialOptions} />);
    const baby = screen.getByRole('checkbox', { name: /baby/i });
    const young = screen.getByRole('checkbox', { name: /young/i });
    const adult = screen.getByRole('checkbox', { name: /adult/i });
    const senior = screen.getByRole('checkbox', { name: /senior/i });
    expect(baby).toBeInTheDocument();
    expect(young).toBeInTheDocument();
    expect(adult).toBeInTheDocument();
    expect(senior).toBeInTheDocument();
  });
  test('should have location selection', () => {
    render(<OptionsModal open={true} initialOptions={initialOptions} />);
    const query = screen.getByRole('radiogroup', { name: /location/i });
    expect(query).toBeInTheDocument();
  });
  test('should not contain accessibility violations', async () => {
    const { container } = render(<OptionsModal initialOptions={initialOptions} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('User', () => {
  test('should have ability to change type', () => {
    render(<OptionsModal open={true} initialOptions={initialOptions} />);
    const query = screen.getByRole('radio', { name: /Cat/ });
    expect(query.checked).toEqual(false);
    userEvent.click(query);
    expect(query.checked).toEqual(true);
  });
  test('should have ability to change age', () => {
    render(<OptionsModal open={true} initialOptions={initialOptions} />);
    testAgeClick(/baby/i);
    testAgeClick(/young/i);
    testAgeClick(/adult/i);
    testAgeClick(/senior/i);
  });
});
