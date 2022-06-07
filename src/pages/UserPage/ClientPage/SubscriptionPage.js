import React, { Component } from 'react';
import NavbarUser from './../../../components/User/Client/NavbarUser';
import Footer from '../../../components/User/Client/footer/Footer';
import CardPayment from './../../../components/User/Client/payment/CardPayment';
import callApi from './../../../connect/API-caller';
import swal from 'sweetalert';

export default class SubscriptionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source: '',
            plan: [],
            company: [],
            form: false,
            nameplan: '',
            namecompany: '',
            subscription: ''
        };
    }

    componentDidMount() {
        callApi('/api/user/payment/check-payment-source', 'GET', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            if (res) {
                this.setState({
                    source: res.data.source
                });
                //console.log(res.data.source);
            }
        }).catch(err => {
            //console.log(err);
        });

        callApi('/api/plan/', 'GET', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            //console.log(res.data);
            this.setState({
                plan: res.data
            });
        }).catch(err => {
            //console.log(err);
        });

        callApi('/api/user/company/my-company/', 'GET', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            //console.log(res.data.results);
            this.setState({
                company: res.data.results
            });
        }).catch(err => {
            //console.log(err);
        });

        callApi('/api/user/subscription/', 'GET', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            //console.log(res.data);
            this.setState({
                subscription: res.data
            })
        }).catch(err => {
            //console.log(err);
        });
    }

    onCancelplan(id) {

        swal({
            title: "Do you want to ?",
            icon: "info",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                callApi('/api/user/subscription/cancel-plan', 'POST', {
                    company_id: id
                }, {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }).then(res => {
                    callApi('/api/user/subscription/', 'GET', null, {
                        Authorization: `JWT ${localStorage.getItem('token')}`
                    }).then(res => {
                        //console.log(res.data);
                        this.setState({
                            subscription: res.data
                        })
                    }).catch(err => {
                        //console.log(err);
                    });
                }).catch(err => {
                    //console.log(err);
                });
            } else {
                //swal("C");
            }
        });
    }

    listsubscription() {
        var { subscription } = this.state;
        var result = null;
        if (subscription.length > 0) {
            result = subscription.map((subscription, index) => {
                return (
                    <tr key={index} align="center">
                        <td>
                            <div className="subscriptionimg">
                            <img src={subscription.company.logo} className="img-responsive"
                                alt="jsx-a11y/alt-text" />
                            </div>
                        </td>
                        <td>{subscription.company.store_name}</td>
                        <td>{subscription.plan.name}</td>
                        <td>{subscription.plan.price}</td>
                        <td><button className="btn btn-warning" onClick={() => this.onCancelplan(subscription.company.id)}>
                            <i className="fa fa-trash"></i></button></td>
                    </tr>
                );
            });
        }
        return result;
    }
    
    detachSubscription() {
        swal({
            title: "Do you want to Clear Cart?",
            icon: "info",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                callApi('/api/user/payment/detach-card', 'POST', {}, {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }).then(res => {
                    if (200 <= res.status && res.status < 400) {
                        //console.log(res);
                        this.setState({
                            source: false
                        });
                        swal("Great!", "Detach Subscription Successfully!", "success")
                    }else{

                    }
                }).catch(err => {
                    //console.log(err);
                    swal("Error", "Detach Subscription Error!", "error")
                });
            } else {
                //swal("C");
            }
        });
    }

    showCompany() {
        var { company } = this.state;
        var result = null;
        if (company.length > 0) {
            result = company.map((company, index) => {
                return (
                    <option name="namecompany" key={index} value={company.id}>{company.store_name}</option>
                );
            });
        }
        return result;
    }

    showPlan() {
        var { plan } = this.state;
        var result = null;
        if (plan.length > 0) {
            result = plan.map((plan, index) => {
                return (
                    <option name="nameplan" key={index} value={plan.id}>{plan.name} - {plan.price} {plan.currency}</option>
                );
            });
        }
        return result;
    }

    onSave = (e) => {
        e.preventDefault();
        if(this.state.namecompany != "" || this.state.nameplan != ""){
            callApi('/api/user/subscription/', 'POST', {
                company_id: this.state.namecompany,
                plan_id: this.state.nameplan,
                trial_period_days: ""
            }, {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }).then(res => {
                if (res.status >= 200 && res.status < 400) {
                    //console.log(res)
                    this.setState({
                        form: false,
                    });
    
                    swal({
                        title: "Add Successfully",
                        icon: "success",
                        buttons: "Ok"
                    })
                    callApi('/api/user/subscription/', 'GET', null, {
                        Authorization: `JWT ${localStorage.getItem('token')}`
                    }).then(res => {
                        //console.log(res.data);
                        this.setState({
                            subscription: res.data
                        })
                    }).catch(err => {
                        //console.log(err);
                    });
                } else {
                    swal({
                        title: "Add error",
                        icon: "error",
                        buttons: "Ok"
                    })
                }
                console.log(res);
                swal("Great!", "Subscription Successfully!", "success")
            }).catch(err => {
                console.log(err);
            });
        }else{
            swal("Error!", "Value Subscription Null!", "error")
        }
        
    }
    onChange = (even) => {
        var target = even.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value,
        });
    };
    formSubscription() {
        if (this.state.form) {
            return (
                <div className="scomapny">
                    <form onSubmit={this.onSave}>
                        <legend>Subscription Comapny</legend>
                        <hr></hr>
                        <div className="form-group">
                            <select className="form-control"
                                name="namecompany"
                                value={this.state.namecompany || ""}
                                onChange={this.onChange}>
                                <option value={0}>Select Comanpy:</option>
                                {this.showCompany()}
                            </select>
                        </div>
                        <div className="form-group">
                            <select className="form-control"
                                name="nameplan"
                                value={this.state.nameplan || ""}
                                onChange={this.onChange}>
                                <option value={0}>Select Plan:</option>
                                {this.showPlan()}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button className="btn btn-danger" onClick={() => this.onClose()}>Close</button>
                    </form>
                </div>
            );
        } else {

        }
    }
    onClose() {
        this.setState({
            form: false
        });
    }
    newSubscription() {
        this.setState({
            form: true
        });
    }
    shownewSubscription() {
        return (
            <div className="newsubscrip" onClick={() => this.newSubscription()}>
                <span className="btn btn-success">
                    <i className="fas fa-folder-plus"></i> New Subscription</span></div>
        );
    }
    showaddsub(){
        var {source} = this.state;
        console.log(source);
        if(source === false){
            return(<CardPayment source={source}/>);
        }
    }
    render() {
        var {history} = this.props;
        return (
            <div>
                <NavbarUser history={history}/>
                <div className="mrbot-br"><br></br></div>
                <div>
                    <br></br>
                    <br></br>
                    {this.formSubscription()}
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
                <div className="container m-h-800px">
                    <div className="showaddsub">
                        {this.showaddsub()}
                    </div>
                    <div>
                        <div className="subscription">
                            <div className="listsubscrip">
                                <span>List Subscription</span></div>
                            {this.shownewSubscription()}
                            <div className="detachcard" onClick={() => this.detachSubscription()}>
                                <span className="btn btn-danger">
                                    <i className="fas fa-backspace"></i> Detach Card</span></div>
                        </div>
                        <table className="table table-hover">
                            <thead>
                                <tr align="center">
                                    <th>Image</th>
                                    <th>Company Name</th>
                                    <th>Plan Name</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.listsubscription()}
                            </tbody>
                        </table>

                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}