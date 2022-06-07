import React, { Component } from 'react';
import NavbarUser from './../../../components/User/Client/NavbarUser';
import Product from './../../../components/User/Client/product/Product';
import callApi from './../../../connect/API-caller';
import Footer from '../../../components/User/Client/footer/Footer';

export class RecentProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
          products: []
        };
      }

    componentDidMount() {
        callApi('/api/products/popular_products', 'GET', null).then(res =>{
          //console.log(res.data);
        this.setState({
            products : res.data
        });
        }).catch(err =>{
          //console.log(err)
        });

    }

    showProducts(products) {
        var result = null;
        if (products.length > 0) {
          result = products.map((product, index) => {
            return (
              <Product
                key={index}
                product={product}
                index={index}
              />
            );
          });
        }
        return result;
      }

    render() {
        var {products} = this.state;
        var {history} = this.props;
        return (
            <div>
                <NavbarUser history={history}/>
                <div className="mrbot-br"><br></br></div>
                <div className="name-category">
                <h2>Recent Product</h2>
                </div>
                <div className="container">
                  <div className="row">
                      {this.showProducts(products)}
                  </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default RecentProduct
