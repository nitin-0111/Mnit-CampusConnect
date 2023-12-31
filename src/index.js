
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from './features/store'
import ReactGa from 'react-ga4'

import { Provider } from 'react-redux';
const TrackID='G-8TEEWGG10G'
ReactGa.initialize(TrackID)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
    <App />
    </Provider>
  </React.StrictMode>
);

