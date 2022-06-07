import React, { Component } from 'react';
import { Link } from "react-router-dom";
import callApi from '../../../../connect/API-caller';
import axios from 'axios';
import swal from 'sweetalert';
import Pagination from "react-js-pagination";
// import ReactDOM from "react-dom";
// import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");

import ProductList from '../../../../components/User/Admin/ManageProduct/ProductList';
import ProductItem from '../../../../components/User/Admin/ManageProduct/ProductItem';


export class ManageProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            myCompanies: [],
            id: '',
            activePage: 1
            // activePage: 15
        };
    }
    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }
    componentDidMount() {
        callApi('/api/user/company/my-company/', 'get', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            this.setState({
                myCompanies: res.data.results
            });
            // console.log(res.data.results)
        }).catch(err => {
            console.log(err);
        });

        callApi(`/api/user/product/my-product/${this.state.id}`, 'get', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            this.setState({
                products: res.data.results
            });
            // console.log(this.state.products)
        }).catch(err => {
            console.log(err);
        });
        // axios.get('http://172.104.50.113:886/api/user/company/my-company', {
        //     headers: { Authorization: `JWT ${this.state.token}` }
        // })
        //     .then(res => {
        //         this.setState({
        //             myCompanies :res.data.results
        //         });

        //     })
        //     .catch(function (error) {
        //         console.log(error.res);
        //     })
        // axios.get(`http://172.104.50.113:886/api/user/product/my-product/${this.state.id}`,null, {
        //         headers: { Authorization: `JWT ${this.state.token}` }
        // })
        //     .then(res => {
        //         this.setState({
        //             myCompanies :res.data.results
        //         });

        //     })
        //     .catch(function (error) {
        //         console.log(error.res);
        //     })
    }
    onDelete = (id) => {
        var { products } = this.state;
        callApi(`/api/user/product/${id}`, 'DELETE', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            if (200 <= res.status < 400) {
                swal("Delect sucess", "", "success")
                var index = this.findIndex(products, id);
                if (index !== -1) {
                    products.splice(index, 1);
                    this.setState({
                        products: products
                    });
                }
            }
        });
    }
    findIndex = (products, id) => {
        var result = -1;
        products.forEach((products, index) => {
            if (products.id === id) {
                result = index;
                console.log(result)
            }
        });
        return result;
    }
    selectCompany = (e) => {
        callApi(`/api/user/product/my-product/${e.target.value}`, 'get', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            this.setState({
                products: res.data.results
            });
            // console.log(this.state.products)
        }).catch(err => {
            console.log(err);
        });
    }
    // handlePageChange(pageNumber) {
    //     console.log(`active page is ${pageNumber}`);
    //     this.setState({activePage: pageNumber});
    //   }
    render() {
        var { products, myCompanies } = this.state;
        var page = this.state.activePage;
        var temp;

        var myCompany = myCompanies.map((myCompany, index) => {
            return (
                <option key={index} value={myCompany.id}>{myCompany.store_name}</option>
            )
        });

        var result = products.map((product, index) => {
            temp = product;
            if (index >= (page - 1) * 4) {
                if (index < page * 4) {
                    return (
                        <ProductItem
                            key={index}
                            index={index}
                            product={product}
                            onDelete={this.onDelete}
                        />
                    );
                } else { return (<tr key={index}></tr>); }
            } else { return (<tr key={index}></tr>); }
        })
        if (temp) {
            return (
                <div className="container">
                    <div className="n-form-admin n-mb-20 col-12">
                        <div className="form-group n-product-left">
                            <select className="form-control"
                                onChange={this.selectCompany}
                            >
                                <option value="">All</option>
                                {myCompany}
                            </select>

                        </div>

                        <div className="text-right n-product-right">
                            <Link to="product/add" className="btn btn-primary n-product-left"><i className="fa fa-plus-square" aria-hidden="true"></i> Add PRODUCT</Link>
                        </div>
                        <h1 className="n-title">MY PRODUCT</h1>
                    </div>
                    <div className="n-form-admin">

                        <ProductList >
                            {result}
                        </ProductList>
                        <div className="col-3 row mt-3">
                        <Pagination
                            itemClass="page-item"
                            linkClass="page-link"
                            activePage={this.state.activePage}
                            itemsCountPerPage={4}
                            totalItemsCount={this.state.products.length}
                            pageRangeDisplayed={4}
                            onChange={this.handlePageChange.bind(this)}
                        />
                        </div>
                        
                       </div>
                </div>
            )
        }
        else {
            return (
                <div className="container">
                    <div className="n-form-admin n-mb-20 col-12">
                        <div className="form-group n-product-left">
                            <select className="form-control"
                                onChange={this.selectCompany}
                            >
                                <option value="">All</option>
                                {myCompany}
                            </select>

                        </div>

                        <div className="text-right n-product-right">
                            <Link to="product/add" className="btn btn-primary n-product-left"><i className="fa fa-plus-square" aria-hidden="true"></i> Add PRODUCT</Link>
                        </div>
                        <h1 className="n-title">MY PRODUCT</h1>
                    </div>
                    <div className="n-form-admin">

                        <h2 className="text-center">No product</h2>

                    </div>
                </div>
            );
        }
    }
}

export default ManageProduct
