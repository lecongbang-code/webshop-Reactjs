import React from 'react';
import {CardElement,Elements,injectStripe} from 'react-stripe-elements';
import './CardPayment.css'
import swal from 'sweetalert';
import callApi from './../../../../connect/API-caller';
const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding,
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};
class _CardForm extends React.Component {

  handleSubmit = (ev) => {
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createToken()
        .then((payload) => {
          console.log('[token]', payload)
          callApi('/api/user/payment/create-payment-source', 'post', {
            source: payload.token.id
          }, {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }).then(res => {
            if (200 <= res.status < 400) {
              //console.log(res)
              swal({
                title: "Add payment source success",
                icon: "success",
                buttons: "Ok"
              })
            }else{
              swal({
                title: "Error",
                icon: "error",
                buttons: "Ok"
              })
            }
          })
        });
    } else {
      swal({
        title: "Error",
        icon: "error",
        buttons: "Ok"
      })
      // console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <form className="formPayment" onSubmit={this.handleSubmit}>
        <label className="labelPayment">
          Card details
          <CardElement
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <button className="btnPayment">Pay</button>
      </form>
    );
  }
}
const CardForm = injectStripe(_CardForm);


class CardPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementFontSize: window.innerWidth < 450 ? '14px' : '18px',
    };
    window.addEventListener('resize', () => {
      if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
        this.setState({ elementFontSize: '14px' });
      } else if (
        window.innerWidth >= 450 &&
        this.state.elementFontSize !== '18px'
      ) {
        this.setState({ elementFontSize: '18px' });
      }
    });
  }
showcontent(){
  const { elementFontSize } = this.state;
  if(1 === 1){
    return (
      <Elements>
          <CardForm fontSize={elementFontSize}/>
      </Elements>
    );
  }
}
  render() {
    return (
      <div className="Checkout">
        {this.showcontent()}
      </div>
    );
  }
}
export default CardPayment;