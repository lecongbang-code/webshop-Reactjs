// import React, { Component } from 'react'
//  import { injectStripe } from "react-stripe-elements";
//  import {
//     CardElement,
//     Elements,
//     useStripe,
//     useElements,
//   } from '@stripe/react-stripe-js';
// import stripe from '@stripe/stripe-js'
// class AddTokenBank extends Component {

   
//     constructor(props) {
//         super(props);
//         this.state = {
//           routing_number: "110000",
//           account_number: "000123456",
//           country: "Australia",
//           currency: "AUD",
//           isLoading: false,
//         };
//       }

//       onSubmit = (event) => {
//         event.preventDefault();
//         let state = this.state;
//         this.setState({
//           isLoading: true,
//         });
//         this.props.stripe.createToken("bank_account", {
//             country: "AU",
//             currency: "AUD",
//             routing_number: this.state.routing_number,
//             account_number: this.state.account_number,
    
//           })
         
//         //   .then((result) => {
//         //       console.log(result)
//         //     localStorage.setItem("bank_token", result.token.id);
//         //     let history = this.props.props.history;
//         //     history.push("/home/company/verify-account");
//         //   });
//       };
    
//       onChange = (event) => {
//         var target = event.target;
//         var name = target.name;
//         var value = target.value;
//         this.setState({
//           [name]: value,
//         });
//       };
//     render() {
//         return (
//             <div>
//                   <div className="content">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-md-8 mx-auto">
//               <div className="card">
//                 <div className="card-header card-header-primary">
//                   <h4 className="card-title">Add Bank</h4>
//                   <p className="card-category">Fill out card info</p>
//                 </div>
//                 <div className="card-body">
//                   <form onSubmit={this.onSubmit}>
//                     <div className="row">
//                       <div className="col-md-4">
//                         <div className="form-group">
//                           <label>Country</label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             name="country"
//                             value={this.state.country}
//                             onChange={this.onChange}
//                             />
//                         </div>
//                       </div>
//                       <div className="col-md-8">
//                         <div className="form-group">
//                           <label>Currency</label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             name="currency"
//                             value={this.state.currency}
//                             onChange={this.onChange}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-md-6">
//                         <div className="form-group">
//                           <label>Routing Number</label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             name="routing_number"
//                             value={this.state.routing_number}
//                             onChange={this.onChange}
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="form-group">
//                           <label>Account Number</label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             name="account_number"
//                             value={this.state.account_number}
//                             onChange={this.onChange}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-sm-6 ml-auto">
//                       {this.state.isLoading ? (
//                         <div
//                           className="spinner-border text-primary pull-right"
//                           role="status"
//                         >
//                           <span className="sr-only">Loading... </span>
//                         </div>
//                       ) : (
//                         <button
//                           type="submit"
//                           className="btn btn-outline-dark pull-right"
//                         >
//                           Next
//                         </button>
//                       )}
//                     </div>
//                     <div className="clearfix" />
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//   </div>
//         )
//     }
// }
// export default injectStripe(AddTokenBank);