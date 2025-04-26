import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Import your styles
import App from './App.jsx'; // Make sure App is still a .jsx file if you use JSX in it
import store from './store/store.js'; // Assuming you have a Redux store
import { Provider } from 'react-redux';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
