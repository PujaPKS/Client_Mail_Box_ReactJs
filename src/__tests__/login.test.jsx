import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/login/Login';

describe('Login Component', () => {

  // Case 1-> Testing Email Label is Rendered
  test('renders email label correctly', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailLabel = screen.getByLabelText(/Your Email/i);
    expect(emailLabel).toBeInTheDocument();
  });

  // Case 2-> Testing password label is rendered
  test('renders password label correctly', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const passwordLabel = screen.getByLabelText(/Your password/i);
    expect(passwordLabel).toBeInTheDocument();
  });

  // Case 3 -> Testing "Login" Button is Rendered
  test('renders Login button correctly', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  
    const loginButton = screen.getByRole('button', { name: /Login/i });
    expect(loginButton).toBeInTheDocument();
  });
  
  // Case 4 -> Testing "Create Here" Link is Rendered
  test('renders "Create Here" link correctly', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const createAccountLink = screen.getByRole('link', { name: /Create Here/i });
    expect(createAccountLink).toBeInTheDocument();
    expect(createAccountLink).toHaveAttribute('href', '/signup');
  }); 
});