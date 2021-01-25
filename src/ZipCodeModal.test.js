import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import ZipCodeModal from './ZipCodeModal';

expect.extend(toHaveNoViolations);

describe('ZipCodeModal', () => {
  test('should have zip code input', () => {
    render(<ZipCodeModal />);
    const query = screen.getByRole('textbox', { name: /zip code/i });
    expect(query).toBeInTheDocument();
  });

  test('should not contain accessibility violations', async () => {
    const { container } = render(<ZipCodeModal />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
})

describe('User', () => {
  test('should have ability to type in zip code input', () => {
    render(<ZipCodeModal />);
    const query = screen.getByRole('textbox', { name: /zip code/i });
    userEvent.type(query, '10001');
    expect(query).toHaveValue('10001');
  });
})
