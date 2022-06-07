import React, { Component } from 'react'
import Payment from './../../../components/User/Client/payment/Payment';
import NavbarUser from './../../../components/User/Client/NavbarUser';
import Footer from './../../../components/User/Client/footer/Footer';
import callApi from './../../../connect/API-caller';
import Oderitem from '../../../components/User/Client/payment/Oderitem';
import swal from 'sweetalert';

export class PaymentPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: [],
            products: []
        };
    }

    componentDidMount() {
        callApi('/api/auth/profile', 'GET', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            if (res) {
                this.setState({
                    profile: res.data
                });
            }
        }).catch(err => {
            //console.log(err);
        });
        callApi('/api/user/cart/view-cart', 'GET', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            if (res) {
                this.setState({
                    products: res.data.cart_detail,
                });
            }
        }).catch(err => {
            //console.log(err);
        });
    }
    showProductsoder() {
        var { products } = this.state;
        var result = null;
        if (products.length > 0) {
            result = products.map((product, index) => {
                return (
                    <Oderitem
                        key={index}
                        product={product}
                        RemoveCart={this.RemoveCart}
                    />
                );
            });
        }
        return result;
    }

    totalCart() {
        var { products } = this.state;
        var result = null;
        var price = 0;
        var total = 0;
        var amount = 0;
        if (products.length > 0) {
            result = products.map((product, index) => {
                price = product.product.price
                amount = product.amount
                total += amount * price
            });
        }
        return total;
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

    render() {
        var { total } = this.state;
        var { history } = this.props;
        return (
            <div>
                <NavbarUser history={history}/>
                <div className="mrbot-br"><br></br></div>
                <div className="menumycart">
                    <h1>ODER</h1>
                </div>
                <Payment
                    total={total}
                    history={history}
                    showProductsoder={this.showProductsoder()}
                    totalCart={this.totalCart()} />
                <Footer />
            </div>
        )
    }
}

export default PaymentPage
