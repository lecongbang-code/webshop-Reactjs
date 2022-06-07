import React, { Component } from 'react'
import Product from './Product';
import callApi from './../../../../connect/API-caller';

export default class Related extends Component {
    constructor(props) {
        super(props);
        this.state = {
          products: []
        };
      }

    componentDidMount() {
        callApi('/api/products/random_products', 'GET', null).then(res =>{
          //console.log(res.data);
        this.setState({
            products : res.data
        });
        }).catch(err =>{
          //console.log(err)
        });
    }

    showProducts(products) {
      var {history} =this.props;
        var result = null;
        if (products.length > 0) {
          result = products.map((product, index) => {
            if(index < 4){
              return (
                <Product
                  key={index}
                  product={product}
                  index={index}
                  history={history}
                />
              );
            }
          });
        }
        return result;
      }

    render() {
        var {products} =this.state;
        return (
            <div>
                <div className="related"><h4>Related Listings</h4></div>
            <div className="row">
                {this.showProducts(products)}
                
            </div>
            </div>
            
        )
    }
}
