import React, { Component } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import callApi from '../../../../connect/API-caller';
import '../Admin.css';
import Pagination from "react-js-pagination";

import ManageProGroupList from '../../../../components/User/Admin/ManageProGroup/ManageProGroupList';
import ManageProGroupItem from '../../../../components/User/Admin/ManageProGroup/ManageProGroupItem';

export class ManageProGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proGroups: [],
            myCompanies: [],
            id: '',
            activePage: 1
        };
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
    }
    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }
    selectCompany = (e) => {
        callApi(`/api/company/productgroup?site=${e.target.value}`, 'get', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            this.setState({
                proGroups: res.data
            });
            // console.log(res.data)
        }).catch(err => {
            console.log(err);
        });
    }
    onDelete = (id) => {
        var { proGroups } = this.state;
        callApi(`/api/user/productgroup/${id}/`, 'DELETE', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            if (200 <= res.status < 400) {
                swal("Delect sucess", "", "success")
                var index = this.findIndex(proGroups, id);
                if (index !== -1) {
                    proGroups.splice(index, 1);
                    this.setState({
                        proGroups: proGroups
                    });
                }
            }
        });
    }
    findIndex = (proGroups, id) => {
        var result = -1;
        proGroups.forEach((proGroups, index) => {
            if (proGroups.id === id) {
                result = index;
                console.log(result)
            }
        });
        return result;
    }
    render() {
        var { proGroups, myCompanies } = this.state;
        var page = this.state.activePage;
        var temp;
        var myCompany = myCompanies.map((myCompany, index) => {
            return (
                <option key={index} 
                        value={myCompany.site}
                >{myCompany.store_name}</option>
            )
        })
        // var result = proGroups.map((proGroup, index) => {
        //     return (
        //         <ManageProGroupItem
        //             key={index}
        //             index={index}
        //             proGroup={proGroup}
        //             onDelete={this.onDelete}
        //         />
                
        //     );
        // })
        var result = proGroups.map((proGroup, index) => {
            temp = proGroup;
            if (index >= (page - 1) * 4) {
                if (index < page * 4) {
                    return (
                        <ManageProGroupItem
                    key={index}
                    index={index}
                    proGroup={proGroup}
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
                                <option value="">Change Company</option>
                                {myCompany}
                            </select>
                        </div>
                        <div className="text-right n-product-right">
                            <Link to="/admin/productgroup/add" className="btn btn-primary n-product-left"><i className="fa fa-plus-square" aria-hidden="true"></i> Add PRODUCT GROUP</Link>
                        </div>
                        <h1 className="n-title">MY PRODUCT GROUP</h1>
                    </div>
                    <div className="n-form-admin">
                        <div className="table-responsive">
                            <ManageProGroupList>
                                {result}
                            </ManageProGroupList>
                            <div className="col-3 row mt-3">
                            <Pagination
                                itemClass="page-item"
                                linkClass="page-link"
                                activePage={this.state.activePage}
                                itemsCountPerPage={4}
                                totalItemsCount={this.state.proGroups.length}
                                pageRangeDisplayed={4}
                                onChange={this.handlePageChange.bind(this)}
                            />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className="container">
                    <div className="n-form-admin n-mb-20 col-12">
                        <div className="form-group n-product-left">
                            <select className="form-control"
                                onChange={this.selectCompany}
                            >
                                <option value="">Change Company</option>
                                {myCompany}
                            </select>
                        </div>
                        <div className="text-right n-product-right">
                            <Link to="/admin/productgroup/add" className="btn btn-primary n-product-left"><i className="fa fa-plus-square" aria-hidden="true"></i> Add PRODUCT GROUP</Link>
                        </div>
                        <h1 className="n-title">MY PRODUCT GROUP</h1>
                    </div>
                    <div className="n-form-admin">
                        <h2 className="text-center">No Product group</h2>
                    </div>
                </div>
            )
        }
    }
}

export default ManageProGroup
