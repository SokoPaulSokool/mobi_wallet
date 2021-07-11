import React from 'react';
import { render, screen } from '@testing-library/react';
import DepositCurrencyDialog from './DepositCurrencyDialog';

test('renders LandingPage', () => {
    const { getByText } = render(<DepositCurrencyDialog onClose={()=>{}} open={true}  />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
