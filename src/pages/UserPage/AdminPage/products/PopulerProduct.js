import React, { Component } from 'react';
import PopulerProductItem from '../../../../components/User/Admin/ManageProduct/PopulerProductItem';
import callApi from '../../../../connect/API-caller';
import Pagination from "react-js-pagination";

export class PopulerProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            activePage: 1
        };
    }
    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }
    componentDidMount() {
        callApi('/api/user/product/popular_products', 'get', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            this.setState({
                products: res.data
            });
            // console.log(res.data)
        }).catch(err => {
            console.log(err);
        });
    }
    // showpro(products) {
    //     var result = products.map((product, index) => {
    //         var page = this.state.activePage;

    //         if (index >= (page - 1) * 6) {
    //             if (index < page * 6) {
    //                 return (
    //                     <PopulerProductItem
    //                         key={index}
    //                         index={index}
    //                         product={product}
    //                     />
    //                 );
    //             } else { return (<tr key={index}></tr>); }
    //         } else { return (<tr key={index}></tr>); }
    //     });

    //     return result;
    // }
    render() {
        var { products } = this.state
        var page = this.state.activePage;
        var temp;
        var result = products.map((product, index) => {
            temp = product;
            if (index >= (page - 1) * 8) {
                if (index < page * 8) {
                    return (
                        <PopulerProductItem
                            key={index}
                            index={index}
                            product={product}
                        />
                    );
                } else { return (<div key={index}></div>); }
            } else { return (<div key={index}></div>); }
        });

        if (temp) {
            return (
                <div>
                    <div className="n-form-admin n-mb-20">
                        <h1 className="n-title">POPULER PRODUCT</h1>
                    </div>
                    <div className="row">
                        {/* {this.showpro(products)} */}
                        {result}
                    </div>
                    
                        <div className="col-3 row mt-3">
                        <Pagination
                            itemClass="page-item"
                            linkClass="page-link"
                            activePage={this.state.activePage}
                            itemsCountPerPage={8}
                            totalItemsCount={this.state.products.length}
                            pageRangeDisplayed={8}
                            onChange={this.handlePageChange.bind(this)}
                        />
                        </div>
                    
                </div>
            )
        } else {
            return (
                <div>
                    <div className="n-form-admin n-mb-20">
                        <h1 className="n-title">POPULER PRODUCT</h1>
                    </div>
                    
                        <h2 className="text-center">No product</h2>
                    
                </div>
            )
        }
    }
}

export default PopulerProduct



