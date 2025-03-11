import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
// import AuthContext from '../context/AuthContext';
import { login } from '../../store/slice/authSlice'; // ✅ Imported login action
import { useDispatch } from 'react-redux';

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // const authCtx = useContext(AuthContext);
  const dispatch = useDispatch(); // ✅ Used useDispatch hook to get the dispatch function
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    console.log('Logging in:', enteredEmail);
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDAyB2ymH0uyuUvl1s6MxvOSICKWhFgSbo';

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json().then((data) => {
            // authCtx.login(data.idToken); // ✅ Store the token in AuthContext
            dispatch(login(data.idToken)); // ✅ Store the token in Redux
            navigate('/home'); // ✅ Redirect to home after successful login
          });
        } else {
          return res.json().then((data) => {
            let errorMesssage = 'Authentication Failed!';
            if (data && data.error && data.error.message) {
              errorMesssage = data.error.message;
            }
            setErrorMessage(errorMesssage);
            alert(errorMesssage);
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage('Something went wrong!'); // Handle network errors
        alert('Something went wrong!'); // Alert for network errors
        console.log(errorMessage);
      });
  };

  return (
    <section>
      <form onSubmit={submitHandler}>
        <div className="auth">
          <h1>Login</h1>
          <div className="control">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className="control">
            <label htmlFor="password">Your Password</label>
            <input type="password" id="password" required ref={passwordInputRef} />
          </div>
          <div className="actions">
            {!isLoading && <button>Login</button>}
            {isLoading && <p>Sending Request...</p>}
          </div>
        </div>

        {/* ✅ Link to Signup Page instead of button */}
        <div className="submit">
          <p>
            Don’t have an account?{' '}
            <Link to="/signup" className="toggle">
              Create Here
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Login;