import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Oderitem extends Component {

    RemoveCart = (id) => {
        this.props.RemoveCart(id);
    }

    render() {
        var { product } = this.props;
        return (
            <div className="oderitem">
                <div className="icondelete">
                    <button className="btn"
                        onClick={() => this.RemoveCart(product.product.id)}
                    >
                        <i className="fas fa-trash-alt"></i></button>
                </div>
                <div className="oderimg">
                    <Link to={`/productdetails/${product.product.id}/detail`}>
                        <img src={product.product.image}
                            className="img-responsive" alt="jsx-a11y/img-redundant-alt" />
                    </Link>
                </div>
                <div className="oderinfo">
                    <Link to={`/productdetails/${product.product.id}/detail`}>
                        <h2>{product.product.name}</h2>
                    </Link>
                    <h3>${product.product.price}</h3>
                    <h3>amount: {product.amount}</h3>
                    <h3>Model: {product.product.model}</h3>
                </div>
            </div>
        )
    }
}
