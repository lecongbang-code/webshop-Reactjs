import React, { Component } from 'react'
import { StripeProvider } from "react-stripe-elements";
import axios from "axios";
import url from "./../../../../connect/url";
import { Elements } from "react-stripe-elements";
import Checkout from './Checkout';


export default class Payment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view_cart: [],
      stripe: null,
      customer_id: "",
      email: "",
      phone_number: "",
      first_name: "",
      last_name: "",
      address_line_1: "",
      postcode: "",
      state: "",
      suburb: "",
      country: "",
      formErrors: {
        customer_id: "",
        email: "",
        phone_number: "",
        first_name: "",
        last_name: "",
        address_line_1: "",
        postcode: "",
        state: "",
        suburb: "",
        country: "",
      }

    };
  }
  componentDidMount() {
    //load product
    let token = localStorage.getItem("token");
    axios
      .get(`${url}/api/user/cart/view-cart/`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then((res) => {
        if (res) {
          this.setState({
            view_cart: res.data.cart_detail
          });
        }
      });
    //
    this.setState({
      stripe: window.Stripe("pk_test_7X4at47jVmUqka7N8HhdO35N"),
    });
    axios({
      url: `${url}/api/auth/profile`,
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then((res) => {
        if (res) {
          this.setState({
            email: res.data.email,
            phone_number: res.data.phone_number,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
          });
        }
      })
      .catch(() => {
        console.log("fail");
      });
  }
  onChange = (even) => {
    const { name, value } = even.target;
    let formErrors = { ...this.state.formErrors };
    switch (name) {
      case "email":
        formErrors.email =
          value.length < 3 ? "First name is required!" : "";
        break;
        case "phone_number":
        formErrors.phone_number =
          value.length < 3 ? "Phone Number is required!" : "";
        break;
        case "first_name":
        formErrors.first_name =
          value.length < 3 ? "First Name is required!" : "";
        break;
        case "last_name":
        formErrors.last_name =
          value.length < 3 ? "Last Name is required!" : "";
        break;
        case "address_line_1":
        formErrors.address_line_1 =
          value.length < 3 ? "Address Line 1 is required!" : "";
        break;
        case "postcode":
        formErrors.postcode =
          value.length < 3 ? "Postcode is required!" : "";
        break;
        case "state":
        formErrors.state =
          value.length < 3 ? "State is required!" : "";
        break;
        case "suburb":
        formErrors.suburb =
          value.length < 3 ? "Suburb is required!" : "";
        break;
        case "country":
        formErrors.country =
          value.length < 3 ? "Country is required!" : "";
        break;
      default:
        break;
    }

    this.setState({
      formErrors,
      [even.target.name]: even.target.value
    });
    // var target = even.target;
    // var name = target.name;
    // var value = target.value;
    // this.setState({
    //   [name]: value,
    // });
  };
  onChangeStripe = (id) => {
    this.setState({
      customer_id: id,
    });
  };
  createOrder = (ev) => {
    ev.preventDefault();
    console.log(this.state)
  };

  render() {
    var { history } = this.props;
    const { formErrors } = this.state;
    return (
      <div className="container">
        <div className="payment">
          <h1>CONTACT INFORMATION</h1>
          <hr></hr>
          <form onSubmit={this.createOrder}>
            <div className="form-group">
              <span className="form-control-label">Email*</span>
              <input className="form-control"
                name="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" required
                value={this.state.email || ""}
                onChange={this.onChange} />
                {formErrors.email.length > 0 && (
                <span className="errorMessage ">{formErrors.email}</span>
              )}
            </div>
            <div className="form-group">
              <span className="form-control-label">Phone*</span>
              <input
                type="number"
                className="form-control"
                name="phone_number"
                required
                value={this.state.phone_number || ""}
                onChange={this.onChange}
              />
              {formErrors.phone_number.length > 0 && (
                <span className="errorMessage ">{formErrors.phone_number}</span>
              )}
            </div>
            <div className="form-group chiahai fl">
              <span className="form-control-label">First name*</span>
              <input
                type="text"
                className="form-control"
                name="first_name"
                pattern="^[a-zA-Z ]*$" required
                value={this.state.first_name || ""}
                onChange={this.onChange}
              />
              {formErrors.first_name.length > 0 && (
                <span className="errorMessage ">{formErrors.first_name}</span>
              )}
            </div>
            <div className="form-group chiahai fr">
              <span className="form-control-label">Last name*</span>
              <input
                type="text"
                className="form-control"
                name="last_name"
                pattern="^[a-zA-Z ]*$" required
                value={this.state.last_name || ""}
                onChange={this.onChange}
              />
              {formErrors.last_name.length > 0 && (
                <span className="errorMessage ">{formErrors.last_name}</span>
              )}
            </div>
            <div className="form-group clb">
              <span className="form-control-label">Address Line 1*</span>
              <input
                type="text"
                className="form-control"
                name="address_line_1"
                required
                placeholder="Your address"
                value={this.state.address_line_1 || "can tho"}
                onChange={this.onChange}
              />
              {/* {formErrors.address_line_1.length > 0 && (
                <span className="errorMessage ">{formErrors.address_line_1}</span>
              )} */}
            </div>
            <div className="form-group chiaba fl mrr">
              <span className="form-control-label">Postcode*</span>
              <input
                type="text"
                className="form-control"
                name="postcode"
                pattern="^[0-9]+$" required
                value={this.state.postcode || ""}
                onChange={this.onChange}
              />
              {formErrors.postcode.length > 0 && (
                <span className="errorMessage ">{formErrors.postcode}</span>
              )}
            </div>
            <div className="form-group chiaba fl mrr">
              <span className="form-control-label">State*</span>
              <input
                type="text"
                className="form-control"
                name="state"
                required
                value={this.state.state || ""}
                onChange={this.onChange}
              />
              {formErrors.state.length > 0 && (
                <span className="errorMessage ">{formErrors.state}</span>
              )}
            </div>
            <div className="form-group chiaba fl">
              <span className="form-control-label">Suburb*</span>
              <input
                type="text"
                className="form-control"
                name="suburb"
                required
                value={this.state.suburb || ""}
                onChange={this.onChange}
              />
              {formErrors.suburb.length > 0 && (
                <span className="errorMessage ">{formErrors.suburb}</span>
              )}
            </div>
            <div className="form-group clb">
              <span className="form-control-label">Country*</span>
              <input
                type="Text"
                className="form-control"
                name="country"
                value={this.state.country || ""}
                pattern="[a-zA-Z]{2,}" required
                onChange={this.onChange}
              />
              {/* {formErrors.country.length > 0 && (
                <span className="errorMessage ">{formErrors.country}</span>
              )} */}
            </div>
            <div className="form-group">
              <span className="form-control-label"><h1>PAYMENT</h1></span>
              <hr></hr>
            </div>
            <div className="buyout">
              <StripeProvider stripe={this.state.stripe}>
                <Elements>
                  <Checkout
                    onChangeStripe={this.onChangeStripe}
                    history={history}
                    orderData={this.state}
                  />
                </Elements>
              </StripeProvider>
              <div>
              </div>
            </div>
            <div className="mrbt-500px"></div>
          </form>
        </div>
        <div className="oder">
          <h1>ORDER</h1>
          <hr></hr>
          {this.props.showProductsoder}
          <div className="totalcart">
            <hr></hr>
            <span>All Total: </span>
            <span>${this.props.totalCart}</span>
            <hr></hr>
          </div>
        </div>

      </div>


    )
  }
}
