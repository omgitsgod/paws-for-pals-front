import React from 'react';
import { render } from '@testing-library/react';
import App from '../Components/App';

test('renders paws for pals title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/paws for pals/i);
  expect(linkElement).toBeInTheDocument();
});
