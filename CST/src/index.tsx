import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';





const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="<29931420007-dp18uidt963gicfb6niv4maf74p26le9.apps.googleusercontent.com>">;
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);