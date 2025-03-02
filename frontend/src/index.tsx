import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app.tsx';


// This is the updated React 18 syntax:
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
