import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionHistoryDialog from './TransactionHistoryDialog';

test('renders TransactionHistoryDialog', () => {
    const { getByTestId } = render(<TransactionHistoryDialog onClose={()=>{}} open={true}  />);
    const dialogTitle = getByTestId("dialog-title");
    
    expect(dialogTitle).toBeInTheDocument();
});
