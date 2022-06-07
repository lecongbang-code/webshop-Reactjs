import React, { Component } from 'react';
import callApi from '../../connect/API-caller';
export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            repassword: "",

        }
    }
    onHandleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onHandleSubmit = (e) => {
        var {history} = this.props;
        const HandF = this.HandingForm()
        if (HandF.error) {
            alert(HandF.messagebox)
        } else {
            alert(' Create Account Successfully')
            history.push("/emailconfirm");
        }
        e.preventDefault();
        var { first_name, last_name, email, password, repassword } = this.state;
        callApi('/api/auth/register/', 'POST', {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            confirm_password: repassword
        }).then(result => {
            // this.props.history.push('/product')
            if (result.status === 200) {

                console.log(result)

            }
        }).catch(err => {

            console.log(err)
        });
        console.log(this.state);


    }
    HandingForm() {
        let returnDB = {
            error: false,
            messagebox: ''
        }
        const { first_name, last_name, email, password, repassword } = this.state
        //email
        const ktem = /\S+@\S/;
        const ktpw = /^[a-z0-9_-]{6,18}$/;
        const ktfn = /[a-z_-]{2,}$/;
        const ktln = /[a-z_-]{1,}$/;
        if (!ktfn.test(first_name)) {
            returnDB = {
                error: true,
                messagebox: 'Incorrect first_name format  a-z, minimum 2 charaters'
            }
        } else
            if (!ktln.test(last_name)) {
                returnDB = {
                    error: true,
                    messagebox: 'Incorrect last_name format  a-z, minimum  1 charaters'
                }
            } else
                if (!ktem.test(email)) {
                    returnDB = {
                        error: true,
                        messagebox: 'Incorrect email format'
                    }
                } else

                    //mật khẩu

                    if (!ktpw.test(password)) {
                        returnDB = {
                            error: true,
                            messagebox: 'Incorrect password format, a-z,0-9,6-18 charaters'
                        }
                    } else
                        // nhập lại mk
                        if (repassword !== password) {
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
                        <div className="header-body text-center mb-7">
                            <div className="row justify-content-center">
                                <div className="col-xl-5 col-lg-6 col-md-8 px-5">
                                    <h1 className="text-white">Create an account</h1>
                                    <p className="text-lead text-white">Use these awesome forms to login or create new account in your project for free.</p>
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
                <div className="container mt--8 pb-5">
                    {/* Table */}
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8">
                            <div className="card bg-secondary border-0">
                                <div className="card-header bg-transparent pb-5">
                                    <div className="text-muted text-center mt-2 mb-4"><small>Sign up with</small></div>
                                    <div className="text-center">
                                        <a href="aaa" className="btn btn-neutral btn-icon mr-4">
                                            <span className="btn-inner--icon"><img src="../assets/img/icons/common/github.svg" alt="hình ảnh" /></span>
                                            <span className="btn-inner--text">Github</span>
                                        </a>
                                        <a href="aaa" className="btn btn-neutral btn-icon">
                                            <span className="btn-inner--icon"><img src="../assets/img/icons/common/google.svg" alt="hình ảnh" /></span>
                                            <span className="btn-inner--text">Google</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="card-body px-lg-5 py-lg-5">
                                    <div className="text-center text-muted mb-4">
                                        <small>Or sign up with credentials</small>
                                    </div>
                                    <form onSubmit={this.onHandleSubmit}>
                                        <div className="form-group">
                                            <div className="input-group input-group-merge input-group-alternative mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-hat-3" /></span>
                                                </div>
                                                <input className="form-control"
                                                    placeholder="first_name"
                                                    name="first_name"
                                                    type="text"
                                                    onChange={this.onHandleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group input-group-merge input-group-alternative mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-hat-3" /></span>
                                                </div>
                                                <input className="form-control"
                                                    placeholder="last_name"
                                                    name="last_name"
                                                    type="text"
                                                    onChange={this.onHandleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group input-group-merge input-group-alternative mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-email-83" /></span>
                                                </div>
                                                <input className="form-control"
                                                    placeholder="Email"
                                                    type="text"
                                                    name="email"
                                                    onChange={this.onHandleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group input-group-merge input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                                                </div>
                                                <input className="form-control"
                                                    placeholder="Password"
                                                    type="password"
                                                    name="password"
                                                    onChange={this.onHandleChange}
                                                />
                                            </div>

                                        </div>
                                        <div className="form-group">
                                            <div className="input-group input-group-merge input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                                                </div>
                                                <input className="form-control"
                                                    placeholder="Enter the password"
                                                    type="password"
                                                    name="repassword"
                                                    onChange={this.onHandleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="text-muted font-italic"><small>password strength: <span className="text-success font-weight-700">strong</span></small></div>
                                        <div className="row my-4">
                                            <div className="col-12">
                                                <div className="custom-control custom-control-alternative custom-checkbox">
                                                    <input className="custom-control-input" id="customCheckRegister" type="checkbox" />
                                                    <label className="custom-control-label" htmlFor="customCheckRegister">
                                                        <span className="text-muted">I agree with the <a href="#!">Privacy Policy</a></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit"
                                                className="btn btn-primary mt-4"
                                                onClick={this.onHandleSubmit}
                                            >Create account</button>

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

export default Register
