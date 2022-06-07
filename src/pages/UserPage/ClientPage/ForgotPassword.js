import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
 import callApi from '../../../connect/API-caller';
 import swal from 'sweetalert';
export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            verificationCode: '',
            password: '',
            confirmPassword: ''
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
        callApi('/api/auth/forgot-password', 'POST', {
            email: email
        }).then(res => {
            // this.props.history.push('/product')
            if(res.status === 200){               
                console.log(res)
                alert('Email sent. Please check your email and copy code.')
            }
        }).catch( ()=>{
            alert("Email not found");
        });
    }
    verificationCodeConfirm = (e) =>{
        e.preventDefault();
        const HandF = this.HandingForm()
       
        var { verificationCode, password, confirmPassword } = this.state;
        var {history} = this.props;
        const ktpw = /^[a-z0-9_-]{6,18}$/;
        callApi(`/api/auth/reset-password/${verificationCode}`, 'PUT', {
            new_password: password,
            confirm_password: confirmPassword
        }).then(res => {
            // this.props.history.push('/product')
            if(res.status === 200){               
                console.log(res);
                swal("PASSWORD UPDATE");
                history.goBack();
            }
        }).catch(  err => {
           
            if (HandF.error) {
                alert(HandF.messagebox)
            }else {
                alert("verificationCode not found");
            }
          console.log(err);
        });
       
    }
    HandingForm() {
        let returnDB = {
            error: false,
            messagebox: ''
        }
        const {  password, confirmPassword } = this.state

        const ktpw = /^[a-z0-9_-]{6,18}$/;
                    if (!ktpw.test(password)) {
                        returnDB = {
                            error: true,
                            messagebox: 'Incorrect password format, a-z,0-9,6-18 charaters'
                        }
                    } else
                        // nhập lại mk
                        if (confirmPassword !== password) {
                            returnDB = {
                                error: true,
                                messagebox: 'Password incorrect'
                            }
                        }
        return returnDB;
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
                                    <h1 className="text-white">Forgot Password</h1>
                                    <p className="text-lead text-white">Please fill the email which you forgot password</p>
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
                                <div className="card-header bg-transparent pb-5">
                                    <div className="text-muted text-center mt-2 mb-4"><small>Sign up with</small></div>
                                    <div className="text-center">
                                        <a href="#" className="btn btn-neutral btn-icon mr-4">
                                            <span className="btn-inner--icon"><img src="../assets/img/icons/common/github.svg" /></span>
                                            <span className="btn-inner--text">Github</span>
                                        </a>
                                        <a href="#" className="btn btn-neutral btn-icon">
                                            <span className="btn-inner--icon"><img src="../assets/img/icons/common/google.svg" /></span>
                                            <span className="btn-inner--text">Google</span>
                                        </a>
                                    </div>
                                </div>
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
                                                <br/>
                                                <br/>
                                                <h4>Copy the end of the link like below image</h4>
                                            </div>
                                            <img src="assets/img/brand/forgotpassword.PNG" height={20} className="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" />
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
                                            <div className="input-group input-group-merge input-group-alternative mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                                                </div>
                                                <input className="form-control"
                                                    placeholder="New Password"
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    value={this.state.password}
                                                    onChange={this.onChange}
                                                    required
                                                />
                                            </div>
                                            <div className="input-group input-group-merge input-group-alternative mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                                                </div>
                                                <input className="form-control"
                                                    placeholder="Confirm Password"
                                                    type="password"
                                                    name="confirmPassword"
                                                    id="password"
                                                    value={this.state.confirmPassword}
                                                    onChange={this.onChange}
                                                    required
                                                />
                                            </div>
                                            <div className="text-center">
                                                <button type="button" onClick={this.verificationCodeConfirm} className="btn btn-primary mt-2mt-2" >Verification Code Confirm</button>
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