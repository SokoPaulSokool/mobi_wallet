import React from 'react';
import { render, screen } from '@testing-library/react';
import SetDefaultCurrencyDialog from './SetDefaultCurrencyDialog';

test('renders LandingPage', () => {
    const { getByText } = render(<SetDefaultCurrencyDialog onClose={()=>{}} open={true}  />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
