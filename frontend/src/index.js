import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { AppProvider } from './context/AppContext.js';
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppProvider>
);
