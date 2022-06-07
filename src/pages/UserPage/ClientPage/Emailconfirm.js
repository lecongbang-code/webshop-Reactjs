import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
 import callApi from '../../../connect/API-caller';
 import swal from 'sweetalert';
export default class EmailConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            verificationCode: '',
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    emailConfirm = (e) => {
        e.preventDefault();
        var { email } = this.state;
        callApi('/api/auth/resend-confirm', 'POST', {
            email: email
        }).then(result => {  
            if (result.status === 200) {
                alert('Email sent. Please check your email and copy code.')
                console.log(result)
            }   
        }).catch( ()=>{
            alert("Email not found");
        });
    }
    verificationCodeConfirm = (e) =>{
        e.preventDefault();
        
        var { verificationCode, } = this.state;
        callApi(`/api/auth/email-confirm/${verificationCode}`, 'GET', {   
        }).then(res => {  
            var {history} = this.props;
            if(res.status === 200){               
                console.log(res);
                swal("EMAIL CONFIRM")
                history.push("/login");
            }
        })
       
    }
   
    render() {
        return (
            <div className="main-content">
                {/* Header */}
                <div className="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
                    <div className="container">
                        <div className="header-body text-center mb-1">
                            <div className="row justify-content-center">
                                <div className="col-xl-5 col-lg-4 col-md-8 px-5">
                                    <h1 className="text-white">Thanks for the registration, please confirm email to activate your account!</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="separator separator-bottom separator-skew zindex-100">
                        <svg x={0} y={0} viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <polygon className="fill-default" points="2560 0 2560 100 0 100" />
                        </svg>
                    </div>
                </div>
                {/* Page content */}
                <div className="bg-default mt--8 pb-5">
                    {/* Table */}
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-8">
                            <div className="card bg-secondary border-0">
                               
                                <div className="card-body px-lg-5 py-lg-5">
                                    <div className="text-center text-muted mb-4">
                                        <small>Please fill your email</small>
                                    </div>
                                    <form >
                                        <div className="form-group">
                                            <div className="input-group input-group-merge input-group-alternative mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-email-83" /></span>
                                                </div>
                                                <input className="form-control"
                                                    placeholder="Email"
                                                    type="text"
                                                    name="email"
                                                    value={this.state.email}
                                                    onChange={this.onChange}
                                                    required
                                                />
                                            </div>
                                            <div className="text-center">
                                                <button type="button float-md-left" onClick={this.emailConfirm} className="btn btn-primary " >Email Confirm</button>
                                                
                                                <h4>Copy the end of the link like below image</h4>
                                            </div>
                                            <img src="assets/img/brand/" height={20} className="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" />
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group input-group-merge input-group-alternative mb-3 mt-2">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                                                </div>
                                                <input className="form-control"
                                                    placeholder="Verification code"
                                                    type="text"
                                                    name="verificationCode"
                                                    value={this.state.verificationCode}
                                                    onChange={this.onChange}
                                                    required
                                                />
                                            </div>
                                            
                                           
                                            <div className="text-center">
                                                <button type="submit" onClick={this.verificationCodeConfirm} className="btn btn-primary mt-2mt-2" >Verification Code Confirm</button>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}