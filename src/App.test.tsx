import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header and list places page by default', () => {
  render(<App />);
  const headerElement = screen.getByText('Business Search');
  expect(headerElement).toBeInTheDocument();

  const searchBoxElement = screen.getByPlaceholderText('Search by name or address...');
  expect(searchBoxElement).toBeInTheDocument();
});
