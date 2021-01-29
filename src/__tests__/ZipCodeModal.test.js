import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import ZipCodeModal from '../Components/ZipCodeModal';

describe('ZipCodeModal', () => {
  test('should have zip code input', () => {
    render(<ZipCodeModal open={true} />);
    const query = screen.getByRole('textbox', { name: /zip code/i });
    expect(query).toBeInTheDocument();
  });

  test('should not contain accessibility violations', async () => {
    const { container } = render(<ZipCodeModal open={true} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
})

describe('User', () => {
  test('should have ability to type in zip code input', () => {
    render(<ZipCodeModal open={true} />);
    const query = screen.getByRole('textbox', { name: /zip code/i });
    userEvent.type(query, '10001');
    expect(query).toHaveValue('10001');
  });
})
