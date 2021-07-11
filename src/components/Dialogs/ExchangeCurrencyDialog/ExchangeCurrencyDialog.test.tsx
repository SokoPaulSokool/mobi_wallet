import React from 'react';
import { render, screen } from '@testing-library/react';
import ExchangeCurrencyDialog from './ExchangeCurrencyDialog';

test('renders LandingPage', () => {
    const { getByText } = render(<ExchangeCurrencyDialog onClose={()=>{}} open={true}  />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
