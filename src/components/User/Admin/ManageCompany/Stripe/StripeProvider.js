import React from 'react';
import {render} from 'react-dom';
import {StripeProvider} from 'react-stripe-elements';
 
import MyStoreCheckout from './MyStoreCheckout';
import AddTokenBank from '../Bank/AddTokenBank';
 
const API = () => {
  return (
    <StripeProvider apiKey="pk_test_12345">
      <AddTokenBank/>
    </StripeProvider>
  );
};
 
export default API