import React, { Component } from 'react'
import Cart from './../../../components/User/Client/cart/Cart';
import { Link } from 'react-router-dom';
import NavbarUser from './../../../components/User/Client/NavbarUser';
import callApi from './../../../connect/API-caller';
import Footer from '../../../components/User/Client/footer/Footer';
import swal from 'sweetalert';

export class CartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            clear: false
        };
    }
    componentDidMount() {
        callApi('/api/user/cart/view-cart', 'GET', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            if (res) {
                //console.log(res.data.cart_detail);
                this.setState({
                    products: res.data.cart_detail
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    showProducts(products) {
        var result = null;
        if (products.length > 0) {
            result = products.map((product, index) => {
                return (
                    <Cart key={index}
                        product={product}
                        index={index}
                        RemoveCart={this.RemoveCart}
                    />
                );
            });
        } else {
            result = <div className="container notcart">
            <nav className="navbar navbar-horizontal navbar-dark bg-warning ">
                <div className="container ">
                    <a className="navbar-brand">Not Product In Cart</a>
                </div>
            </nav>
        </div>
        }
        return result;
    }

    showcheck(products, history) {
        if (products.length > 0) {
            return (<div className="container">
                <div className="buy">
                    <Link to="/payment">
                        <button className="btn btn-success">Checkout</button>
                    </Link>
                    <button className="btn btn-danger"
                        onClick={() => this.Clearcart(history)}>Clear Cart</button>
                </div>
            </div>);
        }
    }

    RemoveCart = (id) => {
        swal({
            title: "Do you want to Remove Cart?",
            icon: "info",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                callApi('/api/user/cart/remove-from-cart', 'POST', {
                    product: id
                }, {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }).then(res => {
                    if (res) {
                        swal("Great!", "Cleared cart successfully!", "success")
                        callApi('/api/user/cart/view-cart', 'GET', null, {
                            Authorization: `JWT ${localStorage.getItem('token')}`
                        }).then(res => {
                            if (res) {
                                this.setState({
                                    products: res.data.cart_detail
                                });
                            }
                        }).catch(err => { });
                    }
                }).catch(err => {
                    console.log(err);
                });
            } else {
                //swal("C");
            }
        });
    }

    Clearcart(history) {
        swal({
            title: "Do you want to Clear Cart?",
            icon: "info",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                callApi('/api/user/cart/clear', 'GET', null, {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }).then(res => {
                    if (res) {
                        swal("Great!", "Cleared cart successfully!", "success")
                        history.push("/");
                    }
                }).catch(err => {
                    console.log(err);
                });
            } else {
                //swal("C");
            }
        });
    }

    render() {
        var { history } = this.props;
        var { products } = this.state;
        return (
            <div className="">
                <NavbarUser history={history}/>
                <div className="mrbot-br"><br></br></div>
                <div className="menumycart">
                    <h1>YOUR CART</h1>
                </div>

                {this.showProducts(products)}

                {this.showcheck(products, history)}

                <Footer />
            </div>
        )
    }
}

export default CartPage
