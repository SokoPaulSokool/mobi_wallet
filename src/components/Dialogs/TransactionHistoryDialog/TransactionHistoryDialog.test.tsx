import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionHistoryDialog from './TransactionHistoryDialog';

test('renders LandingPage', () => {
    const { getByText } = render(<TransactionHistoryDialog onClose={()=>{}} open={true}  />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
