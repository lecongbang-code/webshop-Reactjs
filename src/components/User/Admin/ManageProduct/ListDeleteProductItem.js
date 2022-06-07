import React, { Component } from 'react'

export class ListDeleteProductItem extends Component {
    render() {
        var {product, index}= this.props;
        return (
            <tr>
                <td>{index+1}</td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
            </tr>
        )
    }
}

export default ListDeleteProductItem
