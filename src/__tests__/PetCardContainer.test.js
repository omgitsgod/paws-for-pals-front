import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import PetCardContainer from '../Components/PetCardContainer';

describe('PetCardContainer', () => {
  test('should not contain accessibility violations', async () => {
    const { container } = render(<PetCardContainer />);
    await screen.findByText('Romeo Go');
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

