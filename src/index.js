import React from 'react';
import ReactDOM from 'react-dom/client';
import Calendar from './components/Calendar/Calendar';
import { GlobalStyle } from './globalstyle/globalStyle';
import { Provider } from 'react-redux';
import store from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <Calendar />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
