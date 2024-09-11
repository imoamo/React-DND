import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store, { persistor } from './store.js'; // Import persistor from the store
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* Wrap your app in PersistGate */}
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
