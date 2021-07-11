import React from 'react';
import { render, screen } from '@testing-library/react';
import AddCurrencyDialog from './AddCurrencyDialog';

test('renders LandingPage', () => {
    const { getByText } = render(<AddCurrencyDialog onClose={()=>{}} open={true}  />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
