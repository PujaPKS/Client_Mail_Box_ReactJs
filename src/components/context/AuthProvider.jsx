import React, { useEffect, useState } from 'react'
import AuthContext from './AuthContext';
import { jwtDecode } from 'jwt-decode';

const AuthProvider = (props) => {

    const initialToken = localStorage.getItem('token'); // ✅ Get token from localStorage
    const [token , setToken] = useState(initialToken);
    const [email, setEmail] = useState('');

    const userIsLoggedIn = !!token ; // true if token is not null or not empty string but false if it is null or empty string

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setEmail(decodedToken.email || ''); // Extracted email from token payload
            } catch (error) {
                console.error('Error decoding token:', error);
                setEmail('');
            }
        }
    }, [token]);

    const loginHandler = (token) =>{
        setToken(token); // update the token state to the particular token passed to this function
        localStorage.setItem('token', token); // ✅ Save token in localStorage
    }

    const logoutHandler = () => {
        setToken(null); // cleared token that is set token to null to logout
        localStorage.removeItem('token'); // ✅ Remove token from localStorage
    }

    const contextValue = {
        token : token ,
        isLoggedIn : userIsLoggedIn ,
        login : loginHandler ,
        logout : logoutHandler ,
        email: email, //Provided email in the context
    }

  return (
    <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;


// Added State: email state to store the decoded email.
// Used jwt-decode: To decode the token and extract the email.
// Updated Context: Added email to contextValue so it can be accessed anywhere in the app.
// npm install jwt-decode install