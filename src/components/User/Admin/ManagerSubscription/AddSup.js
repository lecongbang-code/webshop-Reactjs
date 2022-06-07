import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import SubcriptionItem from './SubcriptionItem';
// import SubcriptionList from './SubcriptionList';
import swal from 'sweetalert'
import callApi from '../../../../connect/API-caller';
export default class AddSup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subcriptions: [],
            myCompanies: [],
            plan: [],
            companyId: '',
            planId: '',
            isPayment: false,
            source: ''
        }
    }
    componentWillMount() {
        callApi('/api/user/subscription/', 'get', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            this.setState({
                subcriptions: res.data
            })
        })

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
    onChange = (e) => {
        var { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    onDelete = (id) => {
        callApi('/api/user/subscription/cancel-plan', 'post', {
            company_id: id
        }, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            if (200 <= res.status < 400) {
                swal("Delect done", "", "success")
                var { subcriptions } = this.state
                var index = this.findIndex(subcriptions, id);
                if (index !== -1) {
                    subcriptions.splice(index, 1);
                    this.setState({
                        subcriptions: subcriptions
                    });
                }
            }
        }).catch(err => {
            swal({
                title: "Add Error",
                text: `${err}`,
                icon: "warning",
                dangerMode: true,
            })
            console.log(err)
        })
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

    detachCard = () => {
        swal({
            title: "Are you want to detach card?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((e) => {
            if (e) {
                callApi('/api/user/payment/detach-card', 'post', null, {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }).then(res => {
                    if (200 <= res.status < 400) {
                        swal({
                            title: "Detach card sucesfully",
                            icon: 'success',
                            button: true
                        })
                        this.setState({
                            isPayment: false
                        })
                    }
                })
            }
        })
    }

    checkPayment=(e)=>{
        if(e == true){
            this.setState({
                isPayment: true
            })
        }
    }
    render() {

        var { isPayment, subcriptions, myCompanies, plan, planId, companyId } = this.state;

        var result = subcriptions.map((subcription, index) => {
            return (
                <SubcriptionItem
                    key={index}
                    index={index}
                    subcription={subcription}
                    onDelete={this.onDelete}
                />
            )
        })

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


        return (
            <div>
                   
                                           

        {isCheckPayment}

                                 
                    {/* Add subcription */}
                    <div>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">FORM ADD</h5>
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
                                            <option>______Select company ______</option>
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
                                            <option>______Select plan ______</option>
                                            {plan}
                                        </select>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                   
                                    <button type="submit" className="btn btn-success">ADD</button>
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
                {/* ---------------- */}
                <div className="container-fluid mt--10">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row align-items-center">
                                        <div className="col-12">
                                           
                                        </div>
                                      
                                    </div>
                                </div>
                              
                             
                                <div className="table-responsive"></div> 
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
                
         
    

