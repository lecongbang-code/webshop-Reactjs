import React, { Component } from 'react'

export default class Myreviews extends Component {

    showProducts(products) {
        var result = null;
        if (products.length > 0) {
            result = products.map((product, index) => {
                return (
                    <tbody key={index}>
                        <tr>
                            <td style={{ textAlign: 'left' }}>{product.product_details.name}</td>
                            <td style={{ textAlign: 'left' }}>{product.rating}</td>
                            <td style={{ textAlign: 'left' }}>{product.modified_at}</td>
                        </tr>
                    </tbody>
                );
            });
        }else{
            return(
                <div className="container notcart">
            <nav className="navbar navbar-horizontal navbar-dark bg-warning ">
                <div className="container ">
                    <a className="navbar-brand">Not Review</a>
                </div>
            </nav>
        </div>
            );
        }
        return result;
    }
    render() {
        var { products } = this.props;
        console.log(products);
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Review</th>
                        <th>Date</th>
                    </tr>
                </thead>
                {this.showProducts(products)}

            </table>
        )
    }
}
