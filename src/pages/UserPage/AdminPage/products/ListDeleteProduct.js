import React, { Component } from 'react';
import callApi from '../../../../connect/API-caller';
import ListDeleteProductItem from '../../../../components/User/Admin/ManageProduct/ListDeleteProductItem';
import Pagination from "react-js-pagination";

export class ListDeleteProduct extends Component {
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
        callApi('/api/user/product/deleted', 'get', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            this.setState({
                products: res.data.results
            });
            // console.log(res.data.results)
        }).catch(err => {
            console.log(err);
        });
    }
    // resultPro(products) {
    //     var result = products.map((product, index) => {
    //         return (
    //             <ListDeleteProductItem
    //                 key={index}
    //                 index={index}
    //                 product={product} 
    //             />
    //         );
    //     })
    //     return result;
    // }
    render() {
        var { products } = this.state
        var page = this.state.activePage;
        var temp;
        var result = products.map((product, index) => {
            temp = product;
            if (index >= (page - 1) * 5) {
                if (index < page * 5) {
                    return (
                        <ListDeleteProductItem
                            key={index}
                            index={index}
                            product={product}
                        />
                    );
                } else { return (<tr key={index}></tr>); }
            } else { return (<tr key={index}></tr>); }
        });
        if (temp) {
            return (
                <div>
                    <div className="n-form-admin n-mb-20">
                        <h1 className="n-title">LIST DELETE PRODUCT</h1>
                    </div>
                    <div className="n-form-admin">
                        <table className="table align-items-center n-tble table-hover table-responsive col-12">
                            <thead className="n-table-title col-12">
                                <tr>
                                    <th scope="col" className="sort n-col-big">Number</th>
                                    <th scope="col" className="sort n-col-big">Id</th>
                                    <th scope="col" className="sort n-col-big">Name</th>
                                    <th scope="col" className="sort n-col-big">Price</th>
                                </tr>
                            </thead>
                            <tbody className="list">
                                {/* {this.resultPro(products)} */}
                                {result}
                            </tbody>
                        </table>
                        <div className="col-3 row">
                        <Pagination
                            itemClass="page-item"
                            linkClass="page-link"
                            activePage={this.state.activePage}
                            itemsCountPerPage={5}
                            totalItemsCount={this.state.products.length}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                        />
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className="n-form-admin n-mb-20">
                        <h1 className="n-title">LIST DELETE PRODUCT</h1>
                    </div>
                    <div className="n-form-admin">
                        <table className="table align-items-center n-tble table-hover table-responsive col-12">
                            <thead className="n-table-title col-12">
                                <tr>
                                    <th scope="col" className="sort n-col-big">Number</th>
                                    <th scope="col" className="sort n-col-big">Id</th>
                                    <th scope="col" className="sort n-col-big">Name</th>
                                    <th scope="col" className="sort n-col-big">Price</th>
                                </tr>
                            </thead>
                        </table>
                        <h2 className="text-center">
                            No Delete Product
                        </h2>
                    </div>
                </div>
            );
        }
    }
}

export default ListDeleteProduct
