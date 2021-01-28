import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import PetCardContainer from './PetCardContainer';
import cards from './mockData';

expect.extend(toHaveNoViolations);
beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({animals: cards}),
  });
});
afterEach(() => {
  jest.restoreAllMocks();
});

describe('PetCardContainer', async () => {
  test('should not contain accessibility violations', async () => {
    const { container } = render(<PetCardContainer />);
    await screen.findByText('Romeo Go');
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

