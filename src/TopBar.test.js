import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import TopBar from './TopBar';

expect.extend(toHaveNoViolations);

describe('TopBar', () => {
  test('should have site name', () => {
    render(<TopBar />);
    const query = screen.getByRole('heading', { name: /paws for pals/i });
    expect(query).toBeInTheDocument();
  });

  test('should not contain accessibility violations', async () => {
    const { container } = render(<TopBar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

