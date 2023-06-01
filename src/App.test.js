import { render, screen } from '@testing-library/react';
import {App} from './App';

test('App rendering because of backend not responding.', () => {
  render(<App />);
  const linkElement = screen.getByText(/Application not available because of:/i);
  expect(linkElement).toBeInTheDocument();
});
