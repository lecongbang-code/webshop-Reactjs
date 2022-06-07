import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import callApi from '../../connect/API-caller';
import swal from 'sweetalert'
export class Login extends Component {
      constructor(props){
        super(props)
        let logIn = false;
        this.state = {
            txtEmail: "",       
            txtPass: '',
            logIn
        }
      }
    
      onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        var { txtEmail, txtPass } = this.state;
        var {history} = this.props;
        callApi('/user/login/', 'POST', {
            email: txtEmail,
            password: txtPass
        }).then(result => {
            // this.props.history.push('/product')
            if(result.status === 200){               
                let token = result.data.token;
                localStorage.setItem('token', token);
                
                this.setState({
                    logIn:true 
                });
                //console.log(result)
                swal("Great!", "Login Succsess!", "success")
                history.push("/"); 
                
            }
        }).catch(  err => {
            alert('Email or password is incorrect')
            console.log(err)
        });
      }


    render() {
        // if(this.state.logIn){
        //     return <Redirect to="/" />   
        // }
        return (
            <div className="main-content">
                {/* Header */}
                <div className="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
                    <div className="container">
                        <div className="header-body text-center mb-7">
                            <div className="row justify-content-center">
                                <div className="col-xl-5 col-lg-6 col-md-8 px-5">
                                    <h1 className="text-white">Welcome!</h1>
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
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-7">
                            <div className="card bg-secondary border-0 mb-0">
                                <div className="card-header bg-transparent pb-5">
                                    <div className="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
                                    <div className="btn-wrapper text-center">
                                        <a className="btn btn-neutral btn-icon" href="aaa">
                                            <span className="btn-inner--icon"><img src="../assets/img/icons/common/github.svg" alt="hình ảnh" /></span>
                                            <span className="btn-inner--text">Github</span>
                                        </a>
                                        <a className="btn btn-neutral btn-icon" href="aaa">
                                            <span className="btn-inner--icon"><img src="../assets/img/icons/common/google.svg" alt="hình ảnh" /></span>
                                            <span className="btn-inner--text">Google</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="card-body px-lg-5 py-lg-5">
                                    <div className="text-center text-muted mb-4">
                                        <small>Or sign in with credentials</small>
                                    </div>
                                    <form onSubmit={this.onSubmit}> 
                                        <div className="form-group mb-3">
                                            <div className="input-group input-group-merge input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-email-83" /></span>
                                                </div>
                                                <input className="form-control" name="txtEmail" placeholder="Email" type="email" onChange={this.onChange} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group input-group-merge input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                                                </div>
                                                <input className="form-control" name="txtPass" placeholder="Password" type="password" onChange={this.onChange} />
                                            </div>
                                        </div>
                                        <div className="custom-control custom-control-alternative custom-checkbox">
                                            <input className="custom-control-input" id=" customCheckLogin" type="checkbox" />
                                            <label className="custom-control-label" htmlFor=" customCheckLogin">
                                                <span className="text-muted">Remember me</span>
                                            </label>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary my-4">Sign in</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            
                            <div className="row mt-3">
                                <div className="col-6">
                                    <a className="text-light" href="aaa"><small>Forgot password?</small></a>
                                </div>
                                <div className="col-6 text-right">
                                    <Link to="/register" className="text-light"><small>Create new account</small></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login

