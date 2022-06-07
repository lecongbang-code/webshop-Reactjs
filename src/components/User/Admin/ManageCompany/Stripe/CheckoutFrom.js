// // CheckoutForm.js
// import React from 'react';
// import {injectStripe} from 'react-stripe-elements';
 
// import AddressSection from './AddressSection';
// import CardSection from './CardSection';
 
// class CheckoutForm extends React.Component {
//   handleSubmit = (ev) => {
//     // We don't want to let default form submission happen here, which would refresh the page.
//     ev.preventDefault();
 
    
//     const cardElement = this.props.elements.getElement('card');
 
    
//     this.props.stripe
//       .createPaymentMethod({
//         type: 'card',
//         card: cardElement,
//         billing_details: {name: 'Jenny Rosen'},
//       })
//       .then(({paymentMethod}) => {
//         console.log('Received Stripe PaymentMethod:', paymentMethod);
//       });
 
    
//     this.props.stripe.confirmCardPayment('{PAYMENT_INTENT_CLIENT_SECRET}', {
//       payment_method: {
//         card: cardElement,
//       },
//     });
 
    
//     this.props.stripe.confirmCardSetup('{PAYMENT_INTENT_CLIENT_SECRET}', {
//       payment_method: {
//         card: cardElement,
//       },
//     });
 
//     // You can also use createToken to create tokens.
//     // See our tokens documentation for more:
//     // https://stripe.com/docs/stripe-js/reference#stripe-create-token
//     // With createToken, you will not need to pass in the reference to
//     // the Element. It will be inferred automatically.
//     this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  



//     this.props.stripe.createSource({
//       type: 'card',
//       owner: {
//         name: 'Jenny Rosen',
//       },
//     });
//   };
 
//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <AddressSection />
//         <CardSection />
//         <button>Confirm order</button>
//       </form>
//     );
//   }
// }
 
// export default injectStripe(CheckoutForm);