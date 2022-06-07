import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import Axios from "axios";
import { Redirect, Link } from "react-router-dom";
import callApi from "../../../../connect/API-caller";
import Pagination from "react-js-pagination";

const url = "http://172.104.50.113:886";

export class ListSubscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listsubscription: [],
            showFormUpDate: false,
            plan_id: '',
            company_id: '',
            store_name: '',
            plan_name: '',
            trial_period_days: '',
            myCompanies: [],
            plan: [],
            myCompanies: [],
            isPayment: false,
            source: '',
            activePage: 1
        };
    }

    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }

    onChange = (even) => {
        var target = even.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value,
        });
        console.log(name)
        console.log(value)
    };

    showUpdate = () => {
        if (this.state.showFormUpDate == true) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 mx-auto">
                            <div className="card">
                                <div className="card-header card-header-primary">
                                    <h2 className="card-title">
                                        {"Update "}
                                    </h2>

                                </div>
                                <div className="card-body" id="boody">
                                    <form encType="multipart/form-data">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <div className="form-group" id="namekompany">
                                                    <h3> Company Name: {this.state.store_name}  </h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group" id="namekompany">
                                                    <h3 id="hix"> PLan Name: {this.state.plan_name}  </h3>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="row" id="trial">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <h3>Trial Period Days</h3>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="trial_period_days"
                                                        onChange={this.onChange}
                                                    // value={companyProfile.phone_number}

                                                    />
                                                </div>
                                            </div>
                                        </div>


                                        <button
                                            className="btn btn-info"
                                            onClick={() => this.upDateSub()}
                                        >
                                            Update
                                    </button>


                                        <div className="clearfix" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }


    componentWillMount() {
        let token = localStorage.getItem("token");
        axios({
            url: `${url}/api/user/subscription/`,
            method: "GET",
            headers: {
                Authorization: `JWT ${token}`
            }
        })
            .then(res => {
                this.setState({
                    listsubscription: res.data

                });
            })
            .catch(err => {
                console.log(err);

            });

        callApi('/api/user/company/my-company/', 'get', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            this.setState({
                myCompanies: res.data.results
            })
        })

        callApi('/api/plan/', 'get', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            this.setState({
                plan: res.data
            })
        })

        callApi('/api/user/payment/check-payment-source', 'get', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            if (res.data.source === true) {
                this.setState({
                    isPayment: true
                })
            } else {
                this.setState({
                    isPayment: false
                })
            }
        })

    }

    checkPayment = (e) => {
        if (e == true) {
            this.setState({
                isPayment: true
            })
        }
    }

    upDateSub = () => {
        let token = localStorage.getItem("token");
        Axios.post(
            `${url}/api/user/subscription/change-plan`,
            {
                company_id: this.state.company_id,
                plan_id: this.state.plan_id,
                trial_period_days: this.state.trial_period_days
            },
            {
                headers: {
                    Authorization: `JWT ${token}`,
                },
            }
        )
            .then((res) => {
                if (res.status === 200) {
                    return swal({
                        title: "Good job!",
                        text: "You clicked the button!",
                        icon: "success",
                        button: "Aww yiss!",
                    });
                }

            })
            .catch(() => {
                return swal({
                    title: "Not Success!",
                    icon: "error",
                    button: "Cancel!",
                });
            });
        this.setState({ showFormUpDate: false })

    }

    handleEdit = (idCompany, idPlan, storeName, plan_Name) => {

        console.log(idCompany, idPlan)

        this.setState({ company_id: idCompany })
        this.setState({ plan_id: idPlan })
        this.setState({ store_name: storeName })
        this.setState({ plan_name: plan_Name })

        this.setState({ showFormUpDate: !this.state.showFormUpDate })
        console.log(this.state.company_id)
        console.log(this.state.plan_id)
    }


    // handle delete subscription
    onhandleDelete = (id) => {



        swal({ title: "Are you sure?", icon: "warning", buttons: true, dangerMode: true, })
            .then((willDelete) => {


                if (willDelete) {
                    console.log(id);
                    let token = localStorage.getItem("token");
                    Axios.post(
                        `${url}/api/user/subscription/cancel-plan`,
                        { company_id: id },
                        {
                            headers: {
                                Authorization: `JWT ${token}`,
                            },
                        }
                    )
                        .then((res) => {
                            console.log(res)
                            if (res.status === 200) {



                                swal({ title: "Success !", text: "You clicked the button!", icon: "success", button: "OK!", })

                                var { listsubscription } = this.state

                                var index = this.findIndex(listsubscription, id);
                                if (index !== -1) {
                                    listsubscription.splice(index, 1);
                                    this.setState({
                                        listsubscription: listsubscription
                                    });
                                }

                            }


                        })


                } else {
                    swal({ title: "Not Success !", icon: "info", button: "OK!", });
                }
            });
    }

    findIndex = (subcriptions, id) => {
        var result = -1;
        subcriptions.forEach((subcription, index) => {
            if (subcription.company.id === id) {
                result = index;

            }
        });
        return result;
    }


    addSubcription = (e) => {
        e.preventDefault()
        if (this.state.isPayment === true) {
            var { companyId, planId } = this.state
            callApi('/api/user/subscription/', 'post', {
                company_id: companyId,
                plan_id: planId,
                trial_period_days: 30
            }, {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }).then(res => {
                if (200 <= res.status < 400) {
                    swal({
                        title: "Add success",
                        icon: "success",
                        buttons: "ok"
                    })
                    console.log(res)

                    callApi('/api/user/subscription/', 'get', null, {
                        Authorization: `JWT ${localStorage.getItem('token')}`
                    }).then(res => {
                        this.setState({
                            subcriptions: res.data
                        })
                    }).catch(err => {
                        console.log(err)
                    })

                }
            }).catch(err => {
                swal({
                    title: "Error",
                    text: `${err.message}`,
                    buttons: "success"
                })
                console.log(err)
            })
        } else {
            swal({
                title: "You must add payment source first",
                icon: "warning"
            })
        }

    }

    render() {

        var { isPayment, subcriptions, myCompanies, plan, planId, companyId ,listsubscription} = this.state;
        console.log(this.state.listsubscription)

        var company = myCompanies.map((myCompany, index) => {

            return (
                <option key={index} value={myCompany.id}>{myCompany.store_name}</option>
            )
        })

        var plan = plan.map((plan, index) => {
            return (
                <option key={index} value={plan.id}>{plan.price} - {plan.currency}</option>
            )
        })

        var isCheckPayment = null
        if (isPayment === false) {
            isCheckPayment = (
                <div className="col-lg-4 float-right">
                    <button
                        type="button"
                        data-toggle="modal"
                        data-target="#payment"
                        className="btn btn-primary add"

                    >Add Payment Method
                    </button>
                </div>
            )
        } else {
            isCheckPayment = (
                <div className="col-lg-2 float-right">
                    <button
                        type="button"
                        className="btn btn-danger add"
                        onClick={this.detachCard}
                    >Detach Card
                    </button>
                </div>
            )
        }

        var page = this.state.activePage;
        var temp;
        var element = this.state.listsubscription.map((sscrip, index) => {
            temp = listsubscription;
            if (index >= (page - 1) * 4) {
                if (index < page * 4) {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{sscrip.id}</td>
                            <td>
                                <img
                                    src={sscrip.company.logo}
                                    alt="hinh"
                                    height="50px" width="50px"
                                />
        
                            </td>
                            <td>{sscrip.company.store_name}</td>
                            <td>{sscrip.plan.name}</td>
                            <td>
                                {sscrip.plan.price}
                            </td>
                            <td>
                                <i
                                    type="submit"
                                    className="btn btn-warning"
                                    // onClick={() => this.handleEdit(sscrip.company.id)}
                                    
                                    onClick={() => this.handleEdit(sscrip.company.id, sscrip.plan.id, sscrip.company.store_name, sscrip.plan.name)}
                                >
                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>Update
                                        </i>
                                <i
                                    type="submit"
                                    className="btn btn-danger"
                                    onClick={() => this.onhandleDelete(sscrip.company.id)}
        
                                >
                                    <i className="fa fa-plus-square" aria-hidden="true"></i>Delete
                                        </i>
                            </td>
                        </tr>
                    );
                } else { return (<div key={index}></div>); }
            } else { return (<div key={index}></div>); }
        });
        return (

            <div>

                <div className="container">
                    <div className="n-form-admin n-mb-20 col-12">
                            <div className="text-right n-product-right">
                            <Link to="/admin/company/Subscription" type="button" id='lukachim' className="btn btn-success"><i className="fa fa-plus-square" aria-hidden="true"></i> ADD SUBSCRIPTION</Link>
                            </div>
                            <h1 className="n-title">MY SUBSCRIPTION</h1>
                    </div>
                    
                        
                            {/* <div className="card-header card-header-primary">
                                <Link to="/admin/company/Subscription" type="button" id='lukachim' className="btn btn-success" >ADD SUBSCRIPTION</Link>
                                <h1 className="n-title">MY SUBSCRIPTION</h1>
                            </div> */}
                            
                                
                                <table className="n-form-admin table align-items-center n-tble table-hover">
                                    <thead className="n-table-title">
                                            <tr>
                                                <th className="sort n-col-big">STT</th>
                                                <th className="sort n-col-big">ID</th>
                                                <th className="sort n-col-big">Image </th>
                                                <th className="sort n-col-big">Company Name</th>
                                                <th className="sort n-col-big">Plan Name</th>
                                                <th className="sort n-col-big">Price</th>
                                                <th className="sort n-col-big">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {element}
                                        </tbody>
                                    </table>
                                    <div className="col-3 row mt-3">
                                        <Pagination
                                            itemClass="page-item"
                                            linkClass="page-link"
                                            activePage={this.state.activePage}
                                            itemsCountPerPage={4}
                                            totalItemsCount={this.state.listsubscription.length}
                                            pageRangeDisplayed={4}
                                            onChange={this.handlePageChange.bind(this)}
                                        />
                                    </div>
                                
                            
                        
                    
                </div>


                {this.showUpdate()}

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Product Group</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={this.addSubcription}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="col-form-label">Company Name:</label>
                                        <select
                                            name="companyId"
                                            type="text"
                                            className="form-control"
                                            id="recipient-name"
                                            onChange={this.onChange}
                                            required
                                            value={companyId}
                                        >
                                            <option> Select company </option>
                                            {company}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message-text" className="col-form-label">Select Plan:</label>
                                        <select
                                            name="planId"
                                            className="form-control"
                                            id="message-text"
                                            onChange={this.onChange}
                                            value={planId}
                                            required
                                        >
                                            <option> Please select plan </option>
                                            {plan}
                                        </select>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary btn-sm">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* ---------------- */}
                {/* Add payment method */}
                <div className="modal fade" id="payment" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Payment Method</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {/* {<CardPayment checkPayment={this.checkPayment}/>} */}
                        </div>
                    </div>
                </div>

                {/* <div>
                    <div className="col-lg-4 float-right">
                        <button
                            type="button"
                            className="btn btn-info add"
                            data-toggle="modal"
                            data-target="#exampleModal"
                        >Add Subcription
                        </button>
                    </div>

                    {isCheckPayment}

                </div> */}

            </div>


        );
    }
}

export default ListSubscription;
