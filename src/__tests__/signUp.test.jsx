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

  // Case 3-> Testing confirm password label is rendered
  test('should render confirm password input field in SignUp mode', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  
    const switchButton = screen.getByRole('button', { name: /Create Here/i });
    fireEvent.click(switchButton);
  
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    expect(confirmPasswordInput).toBeInTheDocument();
  });
  
  // Case 4-> Testing submit button text is correct (Login or Create Account)
  test('should render the correct submit button text', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  
    const loginButton = screen.getByRole('button', { name: /Login/i });
    expect(loginButton).toHaveTextContent('Login');
  
    const switchButton = screen.getByRole('button', { name: /Create Here/i });
    fireEvent.click(switchButton);
  
    const signUpButton = screen.getByRole('button', { name: /Create Account/i });
    expect(signUpButton).toHaveTextContent('Create Account');
  });
  
});