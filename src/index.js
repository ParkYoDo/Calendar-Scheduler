import React from 'react';
import ReactDOM from 'react-dom/client';
import Calendar from './components/Calendar/Calendar';
import { GlobalStyle } from './globalstyle/globalstyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <Calendar />
  </React.StrictMode>,
);
