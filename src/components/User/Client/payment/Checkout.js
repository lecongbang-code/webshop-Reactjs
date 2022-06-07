import React, { Fragment } from "react";
import { injectStripe } from "react-stripe-elements";
import { CardElement } from "react-stripe-elements";
import axios from "axios";
import swal from 'sweetalert';
import url from "./../../../../connect/url";
import { Link } from 'react-router-dom';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      isLoading: false,
      show: true
    };
  }
  onChangeStripe = () => {
    this.setState({
      isLoading: true,
    });
    let token = localStorage.getItem("token");
    this.props.stripe
      .createToken({
        type: "card",
        name: "joe hi",
      })
      .then((res) => {
        const tokenVisa = res.token.id;
        const orderData = this.props.orderData;
        let formData = new FormData(),
          product = orderData.view_cart;
        for (let i = 0; i < product.length; i++) {
          formData.append(
            "products",
            JSON.stringify({
              id: product[i].product.id,
              qty: product[i].amount,
            })
          );
        }
        formData.append("last_name", orderData.last_name);
        formData.append("first_name", orderData.first_name);
        formData.append("email", orderData.email);
        formData.append("phone", orderData.phone_number);
        formData.append("address_line_1", orderData.address_line_1);
        formData.append("address_line_1", "");
        formData.append("postcode", orderData.postcode);
        formData.append("state", orderData.state);
        formData.append("country", orderData.country);
        formData.append("suburb", orderData.postcode);

        axios
          .post(
            `${url}/api/user/cart/payment`,
            { option: 2, token: tokenVisa },
            {
              headers: {
                Authorization: `JWT ${token}`,
              },
            }
          )
          .then((res) => {
            axios
              .post(`${url}/api/user/order/create`, formData, {
                headers: {
                  Authorization: `JWT ${token}`,
                },
              }).catch(() => {
              });
            if (res) {
              this.setState({
                isLoading: false,
              });
              swal("Great!", "Payment Successfully!", "success")
              let { history } = this.props;
              history.push("/");
            }
          })
          .catch(() => {
            this.setState({
              isLoading: false,
            });
            swal("Error!", "Missing required param: destination!", "error")
          });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          id: "1",
        });
      });
  };

  showmycard() {
    if (this.state.show) {
      return (<div className="col-md-12">
        <CardElement className="form-control" />
      </div>);
    } else {
      return (<div>
        <span>You are not connect to payment method!
          <Link to="/subscription" className="btnbtn">Click Here</Link>
          to connect
        </span>
      </div>);
    }
  }

  onCreditcard() {
    if (!this.state.show) {
      this.setState({
        show: true
      });
    }
  }
  onCreditcardtow() {
    if (this.state.show) {
      this.setState({
        show: false
      });
    }
  }

  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="checkout">
            <div className="creditcard"><span className="btn" onClick={() => this.onCreditcard()}>CreditCard</span></div>
            <div className="mycard"><span className="btn" onClick={() => this.onCreditcardtow()}>My Card</span></div>
          </div>
          {this.showmycard()}
          <div className="col-md-3">
            {this.state.id ? (
              <i className="fa fa-check text-danger "></i>
            ) : (
                <div></div>
              )}
          </div>
        </div>
        <div className="row">
          {this.state.isLoading ? (
            <div
              className="spinner-border text-primary mx-auto mt-3"
              role="status"
            >
              <span className="sr-only"> Loading... </span>
            </div>
          ) : (
              <button
                onClick={this.onChangeStripe}
                type="submit"
                className="btn btn-default mrt-20px "
              >
                PAY
              </button>
            )}
        </div>
      </Fragment>
    );
  }
}
export default injectStripe(CheckoutForm);
