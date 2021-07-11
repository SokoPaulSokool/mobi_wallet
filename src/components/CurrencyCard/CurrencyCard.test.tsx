import React from 'react';
import { render, screen } from '@testing-library/react';
import CurrencyCard from './CurrencyCard';

test('renders LandingPage', () => {
    const { getByText } = render(<CurrencyCard  currency={{amount:"", units:""}} onDepositClick={()=>{}} onExchangeClick={()=>{}} />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
