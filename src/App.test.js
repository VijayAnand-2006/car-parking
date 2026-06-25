import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const renderApp = () => render(
  <MemoryRouter>
    <App />
  </MemoryRouter>
);

test('shows the login view and allows switching to registration', async () => {
  renderApp();

  expect(screen.getByRole('heading', { name: /parking login/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /create an account/i })).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: /create an account/i }));

  expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
});

test('opens the dashboard when guest access is chosen', async () => {
  renderApp();

  await userEvent.click(screen.getByRole('button', { name: /skip for now/i }));

  expect(screen.getByText(/parking dashboard/i)).toBeInTheDocument();
  expect(screen.getByText(/occupancy/i)).toBeInTheDocument();
});

test('updates occupancy when a vehicle enters or exits', async () => {
  renderApp();

  await userEvent.click(screen.getByRole('button', { name: /skip for now/i }));

  expect(screen.getByText(/18 of 25 spaces filled/i)).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: /vehicle entry/i }));
  expect(screen.getByText(/19 of 25 spaces filled/i)).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: /vehicle exit/i }));
  expect(screen.getByText(/18 of 25 spaces filled/i)).toBeInTheDocument();
});

test('shows a full-capacity message when all spaces are occupied', async () => {
  renderApp();

  await userEvent.click(screen.getByRole('button', { name: /skip for now/i }));

  const entryButton = screen.getByRole('button', { name: /vehicle entry/i });

  for (let i = 0; i < 7; i += 1) {
    await userEvent.click(entryButton);
  }

  expect(screen.getByText(/parking lot is full/i)).toBeInTheDocument();
});
