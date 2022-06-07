import React, { Component } from 'react'
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

export default class Myfavorites extends Component {

    showProducts(products) {
        //console.log(products)
        var result = null;
        if (products.length > 0) {
          result = products.map((product, index) => {
            return (
            <tr key={index}>
                <td>
                    <div className="favoritesimg">
                        <img src={product.product_details.image} className="img-responsive" 
                        alt="jsx-a11y/img-redundant-alt"/></div>
                </td>
                <td className="middle">
                    <Link to={`/productdetails/${product.product_details.id}/detail`}>
                        <h2>{product.product_details.name}</h2>
                    </Link>
                </td>
                <td className="middle"><h2>{product.product_details.model}</h2></td>
                <td className="middle"><h2>{product.product_details.price}</h2></td>
                <td className="middle"><i className="fas fa-trash-alt btn" 
                onClick={()=>this.removeFavor(product.product_details.id)}></i></td>
            </tr>
            );
          });
        }else{
            return(
                <div className="container notcart">
            <nav className="navbar navbar-horizontal navbar-dark bg-warning ">
                <div className="container ">
                    <a className="navbar-brand">Not Myfavorites</a>
                </div>
            </nav>
        </div>
            );
        }
        return result;
      }

      removeFavor=(id)=>{
        swal({
            title: "Do you want to Remove?",
            icon: "info",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                this.props.removeFavor(id);
            } else {
                //swal("C");
            }
        });
        
      }
    render() {
        var {products} = this.props;
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Information</th>
                        <th>Listing Type</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.showProducts(products)}
                </tbody>
            </table>
        )
    }
}
