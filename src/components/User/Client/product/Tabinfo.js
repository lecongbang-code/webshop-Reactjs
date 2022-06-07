import React, { Component } from 'react'

export default class Tabinfo extends Component {
    render() {
        var { product } = this.props;
        var { company } = this.props;
        return (
            <div className="tabinfo">
                <h4>Product Detail</h4>
                    <div>
                    <div className="card-body">
                        <h1 className="card-title">Product Name: {product.name}</h1>
                        <h2 className="card-title">Product Price: ${product.price}</h2>
                        <h3 className="card-title">Listing Type :{product.site}</h3>
                        <h3 className="card-title">Location :{company.address}</h3>
                    </div>
                    </div>
                </div>
        )
    }
}
