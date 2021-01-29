import '@testing-library/jest-dom/extend-expect';
import { toHaveNoViolations } from 'jest-axe';
import cards from './__tests__/mockData';

expect.extend(toHaveNoViolations);
beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({ animals: cards }),
  });
});
afterEach(() => {
  jest.restoreAllMocks();
});
