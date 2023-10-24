import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WeatherApp from './Components/WeatherApp/WeatherApp'
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';

ReactDOM.render(
  <React.StrictMode>
    <WeatherApp />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(sendToVercelAnalytics);
