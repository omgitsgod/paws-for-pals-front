import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import PetCard from './PetCard';
import cards from './mockData';

expect.extend(toHaveNoViolations);

const bind = jest.fn();
const trans = jest.fn();
const scale = { get: jest.fn(), addChild: jest.fn(), removeChild: jest.fn() };
const rot = { get: jest.fn(), addChild: jest.fn(), removeChild: jest.fn() };

describe('PetCard', () => {
  test('should have pets name', () => {
    render(
      <PetCard
        i={0}
        cards={cards}
        bind={bind}
        trans={trans}
        scale={scale}
        rot={rot}
      />
    );
    const query = screen.getByRole('heading', { name: /romeo go/i });
    expect(query).toBeInTheDocument();
  });

  test('should have pets image', () => {
    render(
      <PetCard
        i={0}
        cards={cards}
        bind={bind}
        trans={trans}
        scale={scale}
        rot={rot}
      />
    );
    const query = screen.getByRole('img', { name: /pal/i });
    expect(query).toBeInTheDocument();
  });

  test('should not contain accessibility violations', async () => {
    const { container } = render(
      <PetCard
        i={0}
        cards={cards}
        bind={bind}
        trans={trans}
        scale={scale}
        rot={rot}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
