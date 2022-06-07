import React, { Component } from 'react'


export default class Myinvoices extends Component {

    showcartproduct(product) {
        var result = null;
        if (product.length > 0) {
            result = product.map((cart, index) => {
                return (
                    <tbody key={index}>
                    <tr>
                        <td>
                            <div className="historycart">
                                <img src={cart.product.image} className="img-responsive" alt="jsx-a11y/img-redundant-alt" />
                            </div>
                        </td>
                        <td><h2>{cart.product.name}</h2></td>
                        <td><h2>{cart.price}Au</h2></td>
                        <td><h2>{cart.amount}</h2></td>
                    </tr>
                    <tr>
                        <td colSpan="4" style={{ textAlign: 'right' }}><h2>Total : ${cart.total}</h2></td>
                    </tr>
                </tbody>
                );
            });
        }else{
            return(
                <div className="container notcart">
            <nav className="navbar navbar-horizontal navbar-dark bg-warning ">
                <div className="container ">
                    <a className="navbar-brand">Not Myinvoices</a>
                </div>
            </nav>
        </div>
            );
        }
        return result;
    }

    render() {
        var { product } = this.props;
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th colSpan="4"><h2 style={{ color: 'white' }}>Order Date {product.paid_at}</h2></th>
                    </tr>
                </thead>
                {this.showcartproduct(product.cart_detail)}
            </table>
        )
    }
}
