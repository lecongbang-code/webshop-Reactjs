import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import callApi from '../../../../connect/API-caller';

export default class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: this.props.product.amount
        };
    }

    RemoveCart = (id) => {
        this.props.RemoveCart(id);
    }

    minus = (id) => {
        var { count } = this.state;
        var countnumber = count - 1;
        this.setState({
            count: count - 1
        });
        if (countnumber >= 1) {
            callApi('/api/user/cart/update-cart', 'POST', {
                product: id,
                amount: countnumber
            }, {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }).then(res => {
            }).catch(err => {
            });
        }
    }

    plus = (id) => {
        var { count } = this.state;
        var countnumber = count + 1;
        this.setState({
            count: count + 1
        });
        if (countnumber >= 1) {
            callApi('/api/user/cart/update-cart', 'POST', {
                product: id,
                amount: countnumber
            }, {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }).then(res => {
            }).catch(err => {
            });
        }
    }

    render() {
        var { product } = this.props;
        var { count } = this.state;
        return (
            <div>
                <div className="container">
                    <table className="table align-items-center ">
                        <thead className="thead-light">
                            <tr>
                                <th >Image</th>
                                <th >Information</th>
                                <th >Price</th>
                                <th >Quality</th>
                                <th >Action</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody className="list">
                            <tr>
                                <td>
                                    <Link to={`/productdetails/${product.product.id}/detail`}>
                                        <img src={product.product.image} className="img-responsive"
                                            alt="jsx-a11y/img-redundant-alt"
                                            width="250"
                                            height="250" />
                                    </Link>

                                </td>
                                <td>
                                    <Link to={`/productdetails/${product.product.id}/detail`}><span
                                        className="name mb-0 text-sm"><h1>{product.product.name}</h1></span></Link>
                                </td>
                                <td className="budget"><h1>${product.product.price}</h1></td>
                                <td>
                                    <i className="fas fa-minus btn"
                                        onClick={() => this.minus(product.product.id)}
                                    ></i>
                                    <span className="count">{count}</span>
                                    <i className="fas fa-plus btn"
                                        onClick={() => this.plus(product.product.id)}
                                    ></i>
                                </td>
                                <td>
                                    <button className="btn btn-danger"
                                        onClick={() => this.RemoveCart(product.product.id)}>
                                        <i className="far fa-trash-alt"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
