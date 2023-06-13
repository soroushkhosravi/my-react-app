import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {CompleteApp} from './App';
import reportWebVitals from './reportWebVitals';
import { sentryInitiator } from './sentryInitiator'

sentryInitiator();

const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<CompleteApp />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
