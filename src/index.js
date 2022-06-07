import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {StripeProvider} from 'react-stripe-elements';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <StripeProvider apiKey="pk_test_7X4at47jVmUqka7N8HhdO35N" >
    <App />
  </StripeProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
