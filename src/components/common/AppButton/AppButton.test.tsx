import React from 'react';
import { render, screen } from '@testing-library/react';
import AppButton from './AppButton';


test('renders LandingPage', () => {
  const { getByText } = render(<AppButton text="s" onClick={()=>{}} />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
