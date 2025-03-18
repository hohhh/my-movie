import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SupabaseProvider } from '../supabase/context/index.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <SupabaseProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SupabaseProvider>,
);
