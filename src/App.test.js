import { render, screen } from '@testing-library/react';
import App from './App';

test('page header with value "Workflows Dashboard" is present', () => {
  render(<App />);
  const pageHeader = screen.getByText('Workflows Dashboard');
  expect(pageHeader).toBeInTheDocument();
});
