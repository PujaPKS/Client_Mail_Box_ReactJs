import { useRef, useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setIsLoading(true);
    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDAyB2ymH0uyuUvl1s6MxvOSICKWhFgSbo',
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (!res.ok) {
          return res.json().then((data) => {
            let errorMessage = 'Authentication Failed!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
          });
        } 
        else {
          console.log('User signed up successfully!');
          navigate('/login');
        }
      });
  };

  return (
    <section>
      <form onSubmit={submitHandler}>
        <div className="auth">
          <h1>Sign Up</h1>
          <div className="control">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className="control">
            <label htmlFor="password">Your Password</label>
            <input type="password" id="password" required ref={passwordInputRef} />
          </div>
          <div className="control">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" required ref={confirmPasswordInputRef} />
          </div>
          <div className="actions">
            {!isLoading && <button>Create Account</button>}
            {isLoading && <p>Sending Request...</p>}
          </div>
        </div>

        <div className="submit">
          <p>
            Already have an account?{' '}
            <Link to='/login' className="toggle">
              Login Here
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
