import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to My Login Page/i);
  expect(linkElement).toBeInTheDocument();  
});
