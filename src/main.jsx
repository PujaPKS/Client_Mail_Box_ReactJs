window.global = window;
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
// import AuthProvider from './components/context/AuthProvider.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <StrictMode>
  //   {/* <AuthProvider> */}
      <BrowserRouter>
        <Provider store = {store}>
          <App />
        </Provider>
      </BrowserRouter>
  //   {/* </AuthProvider> */}
  // </StrictMode>
);