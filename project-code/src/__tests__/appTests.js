import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

it('renders the app', () => {
  render(
    <App></App>
  );
  expect(screen.getByText(/Testing Tutor/)).toBeTruthy();
});

it('opens the learn area', () => {
  render(
    <App></App>
  );
  userEvent.click(screen.getByText('Learn'));
  expect(screen.getByText('Unit Testing')).toBeInTheDocument();
});

it('opens a learn area section', () => {
  render(
    <App></App>
  );
  userEvent.click(screen.getByText('Learn'));
  userEvent.click(screen.getByText('Unit Testing'));
  expect(screen.getByText(/Unit tests exercise small pieces of code/)).toBeInTheDocument();
});

it('opens the practice area', () => {
  render(
    <App></App>
  );
  userEvent.click(screen.getByText('Practice'));
  expect(screen.getByText('Unit Tests')).toBeInTheDocument();
});

it('opens a practice area section', () => {
  render(
    <App></App>
  );
  userEvent.click(screen.getByText('Practice'));
  userEvent.click(screen.getByText(/Edge Cases/));
  userEvent.click(screen.getByText('Fizzbuzz Counts'));
});
