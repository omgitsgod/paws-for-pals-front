import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import SpeedDialMenu from './SpeedDialMenu';

expect.extend(toHaveNoViolations);
const Ids = ['Dogs', 'Cats', 'Options'];

describe('SpeeDialMenu', () => {
  test('should have speeddial button', () => {
    render(<SpeedDialMenu onClickActions={{}} />);
    const query = screen.getByRole('button', { name: /speeddial/i });
    expect(query).toBeInTheDocument();
  });

  test.each(Ids)('should have %s link', (Id) => {
    render(<SpeedDialMenu onClickActions={{}} />);
    const query = screen.getByRole('menuitem', { name: Id });
    expect(query).toBeInTheDocument();
  });

  test('should not contain accessibility violations', async () => {
    const { container } = render(<SpeedDialMenu onClickActions={{}} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
})
