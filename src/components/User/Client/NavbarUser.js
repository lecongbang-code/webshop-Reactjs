import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import callApi from '../../../connect/API-caller';
import swal from 'sweetalert';

export default class NavbarUser extends Component {

  constructor(props) {
    super(props);
    let logIn = false
    this.state = {
      first_name: '',
      last_name: '',
      token: localStorage.getItem('token'),
      logIn
    }
  }
  componentDidMount() {
    callApi('/api/auth/profile', 'GET', null, {
      Authorization: `JWT ${this.state.token}`
    })
      .then(res => {
        if (res) {
          var first_name = res.data.first_name;
          var last_name = res.data.last_name;
          this.setState({
            first_name: first_name,
            last_name: last_name,
            logIn: true
          });
        }
      }).catch(err => {
        console.log(err);
      });
  }

  logan = () => {
    var { logIn } = this.state;
    if (logIn) {
      return (<div className="menuheader">
        <ul className="navbar-nav align-items-center  ml-auto ml-md-0">
          <li className="nav-item dropdown">
            <Link to="" className="nav-link pr-0" role="button"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <div className="media align-items-center">
                <div className="media-body  ml-2  d-none d-lg-block">
                  <span className="mb-0 text-sm  font-weight-bold">{this.state.first_name} {this.state.last_name}</span>
                </div>
              </div>
            </Link>
            <div className="dropdown-menu  dropdown-menu-right ">
              <Link to="/admin/profile" className="dropdown-item">
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </Link>
              <Link to="/subscription" className="dropdown-item">
              <i className="fas fa-clipboard-list"></i>
                <span>Subscription</span>
              </Link>
              <Link to="/myinvoices" className="dropdown-item">
                <i className="ni ni-calendar-grid-58" />
                <span>My Invoices</span>
              </Link>
              <Link to="/admin/product" className="dropdown-item">
                <i className="ni ni-support-16" />
                <span>My Product</span>
              </Link>
              <Link to="/mycart" className="dropdown-item">
                <i className="ni ni-settings-gear-65" />
                <span>My Cart</span>
              </Link>
              <Link to="/myfavorites" className="dropdown-item">
                <i className="ni ni-settings-gear-65" />
                <span>My Favorites</span>
              </Link>
              <Link to="/myreviews" className="dropdown-item">
                <i className="ni ni-settings-gear-65" />
                <span>My Reviews</span>
              </Link>
              <div className="dropdown-divider" />
              <Link to="/" onClick={this.logout} className="dropdown-item">
                <i className="ni ni-user-run" />
                <span>Logout</span></Link>
            </div>
          </li>
        </ul>
      </div>);
    }
    else {
      return (<div className="menuheader">
        <ul>
          <li>
            <Link to=""></Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/forgotpassword">Forgot Password</Link>
          </li>
        </ul>
      </div>);
    }
  }

  logout = (e) =>{
    e.preventDefault()
    var {history} = this.props;
    swal({
        title: "Do you want to log out ?",
        icon: "info",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            callApi('/user/logout/', 'GET', null, {
                Authorization: `JWT ${this.state.token}`
           }).then( res =>{
               localStorage.clear('token')
               this.setState({
                   logIn: false
               })
               history.push("/");
           }).catch(err =>{
               console.log(err)
           })
          swal("Succsess !!!", {
            icon: "success",
          });
        } else {
          //swal("C");
        }
      });
 }

  showDashBoard = () => {
    var { logIn } = this.state;
    if (logIn) {
      return (<li><Link to="/admin"
        className="btn btn-iconhover btn-primary">DashBoard</Link>
      </li>);
    } else
      return null
  }

  // showCart = () => {
  //   var { logIn } = this.state;
  //   if (logIn) {
  //     return (
  //     <div className="iconcart">
  //       <div className="iconitemcart"><Link to="/mycart">
  //         <i className="fas fa-cart-plus"></i></Link>
  //         <span>99</span>
  //         </div>
  //     </div>);
  //   } else
  //     return null
  // }

  render() {
    return (
      <div className="main-content navbaruser" id="panel">
        {this.logan()}
        {/* Topnav */}
        <nav className="navbar navbar-horizontal navbar-expand-lg navbar-dark bg-default" id="grad1">
          <div className="container-fluid">
            <div className="imglogo">
              <Link to="/">
                <img src="/assets/img/brand/blue.png" 
                className="navbar-brand-img"
                  alt="jsx-a11y/alt-text"
                  />
              </Link>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">

              {/* Navbar links */}
              <ul className="navbar-nav align-items-center  ml-md-auto "></ul>
              <ul className="navbar-nav align-items-center  ml-auto ml-md-0 btn-group">
                <li><Link to="/"
                  className="btn btn-iconhover"><i className="ni ni-shop"></i>-Home</Link>
                </li>
                <li><Link to="/featuredproducts"
                  className="btn btn-iconhover"><i className="ni ni-delivery-fast"></i>-Featured Products</Link>
                </li>
                <li><Link to="/recentproduct"
                  className="btn btn-iconhover"><i className="ni ni-folder-17"></i>-Recent Product</Link>
                </li>
                <li><Link to="/contact"
                  className="btn btn-iconhover"><i className="ni ni-satisfied"></i>-Contact US</Link>
                </li>
                {this.showDashBoard()}
              </ul>
            </div>
          </div>
        </nav>
        {/* Header */}
        {/* {this.showCart()} */}
      </div>
    )
  }
}
