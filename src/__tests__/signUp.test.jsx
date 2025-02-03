import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '../components/login/SignUp';

describe('SignUp Component', () => {

  // Case 1-> Testing email label is rendered
  test('renders email label correctly', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    const emailLabel = screen.getByLabelText(/Your Email/i);
    expect(emailLabel).toBeInTheDocument();
  });

  // Case 2-> Testing password label is rendered
  test('renders password label correctly', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    const passwordLabel = screen.getByLabelText(/Your password/i);
    expect(passwordLabel).toBeInTheDocument();
  });

  // Case 3 -> Testing "Confirm Password" label is rendered
  test('renders confirm password label correctly', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    const confirmPasswordLabel = screen.getByLabelText(/Confirm Password/i);
    expect(confirmPasswordLabel).toBeInTheDocument();
  });

  // Case 4 -> Testing "Login Here" link is rendered
  test('renders "Login Here" link correctly', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    const loginLink = screen.getByRole('link', { name: /Login Here/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });
  
});