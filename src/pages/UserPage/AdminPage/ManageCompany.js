import React, { Component } from 'react';
import { Link } from "react-router-dom";
import CompanyList from '../../../components/User/Admin/ManageCompany/CompanyList';
import callApi from '../../../connect/API-caller'
import CompanyItem from '../../../components/User/Admin/ManageCompany/CompanyItem';
import swal from 'sweetalert';
import Pagination from "react-js-pagination";

export class ManageCompany extends Component {

    constructor(props) {
        super(props);
        let logIn = true;
        this.state = {
            results: [],



            token: localStorage.getItem('token'),
            logIn,
            activePage: 1


        }


    }
    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }
    componentWillMount() {
        console.log(this.state.token)
        callApi('/api/user/company/my-company/', 'GET', null, {
            Authorization: `JWT ${this.state.token}`
        }).then(res => {
            console.log(res)

            // console.log(site)
            // localStorage.setItem('site', site);
            this.setState({

                results: res.data.results

            })
        })
    }

    onDelete = (site) => {

        console.log(site);
        var { results } = this.state;
        console.log(results);
        callApi(`/api/user/company/detail/${site}`, 'DELETE', null, { Authorization: `JWT ${this.state.token}` }).then(res => {
            if ((res.status >= 200) && (res.status <= 400)) {
                swal("Company has been deleted!", "You clicked the button!", "success");
                var index = this.findIndex(results, site);
                if (index !== -1) {
                    results.splice(index, 1);
                    this.setState({ results: results });
                }

            }
            console.log(res);


        });
    }

    findIndex = (result, site) => {
        var rS = -1;
        result.forEach((result, index) => {
            if (result.site === site) {
                rS = index;
            }
        });
        return rS;
    }


    render() {
        var { results } = this.state;

        var page = this.state.activePage;
        var temp;
        var result = results.map((product, index) => {
            temp = results;
            if (index >= (page - 1) * 4) {
                if (index < page * 4) {
                    return (
                        <CompanyItem
                            key={index}
                            results={product}
                            index={index}
                            onDelete={this.onDelete}
                        />
                    );
                } else { return (<tr key={index}></tr>); }
            } else { return (<tr key={index}></tr>); }
        });

        if (temp) {
            return (
                <div>

                    <div className="container">
                        <div className="n-form-admin n-mb-20 col-12">
                            <div className="text-right n-product-right">
                                <Link to="/admin/company/add" className="btn btn-primary n-product-left"><i className="fa fa-plus-square" aria-hidden="true"></i> Add COMPANY</Link>
                            </div>
                            <h1 className="n-title">MY COMPANY</h1>
                        </div>
                        <div className="n-form-admin">
                            <div className="table-responsive">
                                <CompanyList>

                                    {/* {this.showProduct(results)} */}
                                    {result}

                                </CompanyList >
                            </div>

                        </div>
                    </div>

                    <div className="col-3 row mt-3">
                        <Pagination
                            itemClass="page-item"
                            linkClass="page-link"
                            activePage={this.state.activePage}
                            itemsCountPerPage={4}
                            totalItemsCount={this.state.results.length}
                            pageRangeDisplayed={4}
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </div>
                </div >
            )
        } else {
            return (
                <div className="container">
                    <div className="n-form-admin n-mb-20 col-12">
                            <div className="text-right n-product-right">
                                <Link to="/admin/company/add" className="btn btn-primary n-product-left"><i className="fa fa-plus-square" aria-hidden="true"></i> Add COMPANY</Link>
                            </div>
                            <h1 className="n-title">MY COMPANY</h1>
                        </div>
                    
                        <h2 className="text-center">Loading....</h2>
                    
                </div>
            )
        }



        // return (
        //     // <div className="mt-3">
        //     //     <Link to="/admin/company/add" type="button" className="btn btn-primary">Add Company</Link>
        //     //     <CompanyList>

        //     //         {this.showProduct(results)}

        //     //     </CompanyList >
        //     // </div>
        //     <div className="container">
        //         <div className="n-form-admin n-mb-20 col-12">
        //             <div className="text-right n-product-right">
        //                 <Link to="/admin/company/add" className="btn btn-primary n-product-left"><i className="fa fa-plus-square" aria-hidden="true"></i> Add COMPANY</Link>
        //             </div>
        //             <h1 className="n-title">MY COMPANY</h1>
        //         </div>
        //         <div className="n-form-admin">
        //             <div className="table-responsive">
        //                 <CompanyList>

        //                     {this.showProduct(results)}

        //                 </CompanyList >
        //             </div>

        //         </div>
        //     </div>
        // );
    }


    showProduct(results) {
        var result = null;
        if (results.length > 0) {
            result = results.map((results, index) => {

                return (
                    <CompanyItem
                        key={index}
                        results={results}
                        index={index}
                        onDelete={this.onDelete}
                    />
                )

            }
            )

        }

        return result;
    }
}
export default ManageCompany
