import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { UncontrolledCounter } from '../App';

test('increments count when clicked', () => {
  render(<UncontrolledCounter />);
  fireEvent.click(screen.getByText(/Increment/i));
  const count = screen.getByText(/Count: 1/i);
  expect(count).toBeInTheDocument();
});
