import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class PopulerProductItem extends Component { 
    render() {
        var {product} = this.props; 
        var id=product.id;
        return (
            <div>
                <div className="card n-populer-product-cart ml-2 p-2">
                    <div className="n-card-img text-center">
                    <img className="card-img-top n-img-populerpro" src={product.image} alt="Card image cap"/>
                    </div>
                    
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                           
                        </div>
                        <Link to={`/productdetails/${id}/detail`} className="btn btn-primary">Info</Link> 
                </div>
            </div>
        )
    }
}

export default PopulerProductItem
