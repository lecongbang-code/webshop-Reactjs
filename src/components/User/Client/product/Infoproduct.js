import React, { Component } from 'react'
import callApi from './../../../../connect/API-caller';
import swal from 'sweetalert';
import './Product.css'
export default class Infoproduct extends Component {

    AddCart(id, history) {
        //console.log(id);
        callApi('/api/user/cart/add-to-cart', 'POST', {
            product: id,
            amount: 1
        }, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            if (res != null) {
                swal("Great!", "Cleared cart successfully!", "success")
                history.push("/mycart");
            } else {
                swal("error", "You need to login!", "error")
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        var { product, history } = this.props;
        var { company } = this.props;
        return (
            <div className="infoproduct">
                <h1 className="">{product.name}</h1>
                <hr></hr>
                <h2 className="">Product Price: <span>${product.price}</span></h2>
                <hr></hr>
                <h3>Listing Type :{product.site}</h3>
                <hr></hr>
                <h3>Location :{company.address}</h3>
                <hr></hr>
                <div className="box-add-cart">
                    <div className="add-to-cart">
                    <button className="btn btn-primary"
                        onClick={() => { this.AddCart(product.id, history) }}>Add Cart</button>
                    </div>
                </div>
            </div>
        )
    }
}
