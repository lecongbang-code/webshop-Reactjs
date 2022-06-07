import React, { Component } from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom'; 

export class ProductItem extends Component {
    constructor(props){
        super(props);
    }
    onDelete=(id)=>{
        swal({
            title: "Are you sure delete this product?",
            text: "Once deleted, you will not be able to recover this product!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                this.props.onDelete(id);
            }
        });
    } 
    render() {
        var { product, index } = this.props;
        return ( 
            <tr>
                <td>{index+1}</td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td><img src={product.image} className="n-img img-fluid" alt="hình ảnh" /></td>
                <td>
                    <Link to={`/admin/product/${product.id}/edit`} className="btn btn-warning"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> EDIT</Link>
                    <button type="button" 
                            className="btn btn-danger"
                            onClick={()=>this.onDelete(product.id)}
                    >
                        <i className="fa fa-trash" aria-hidden="true"></i> DELETE
                    </button>
                </td>
            </tr>
        )
    }
}

export default ProductItem
