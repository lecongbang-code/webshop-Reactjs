import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class NavbarAuth extends Component {
    render() {
        return (
            <nav id="navbar-main" className="navbar navbar-horizontal navbar-transparent navbar-main navbar-expand-lg navbar-light">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <img src="../assets/img/brand/white.png" alt="hình ảnh" />
                    </Link>
                    <button className="navbar-toggler" type="button" >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="navbar-collapse navbar-custom-collapse collapse" id="navbar-collapse">
                        <div className="navbar-collapse-header">
                            <div className="row">
                                <div className="col-6 collapse-brand">

                                    <img src="../assets/img/brand/blue.png" alt="hình ảnh" />

                                </div>
                                <div className="col-6 collapse-close">
                                    <button type="button" className="navbar-toggler" >
                                        <span />
                                        <span />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <ul className="navbar-nav mr-auto">
                            <Link to="/login"> 
                                <li className="nav-item nav-link">
                                    <span className="nav-link-inner--text">Login</span>
                                </li>
                            </Link>
                            <Link to="/register">
                                <li className="nav-item nav-link">
                                    <span className="nav-link-inner--text">Register</span>
                                </li>
                            </Link>
                        </ul>
                        <hr className="d-lg-none" />
                        <ul className="navbar-nav align-items-lg-center ml-lg-auto">
                            <li className="nav-item">
                                <a className="nav-link nav-link-icon" href="aaa">
                                    <i className="fab fa-facebook-square" />
                                    <span className="nav-link-inner--text d-lg-none">Facebook</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-link-icon" href="aaa">
                                    <i className="fab fa-instagram" />
                                    <span className="nav-link-inner--text d-lg-none">Instagram</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-link-icon" href="aaa">
                                    <i className="fab fa-twitter-square" />
                                    <span className="nav-link-inner--text d-lg-none">Twitter</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-link-icon" href="aaa">
                                    <i className="fab fa-github" />
                                    <span className="nav-link-inner--text d-lg-none">Github</span>
                                </a>
                            </li>
                            <li className="nav-item d-none d-lg-block ml-lg-4">
                                <a className="btn btn-neutral btn-icon" href="aaa">
                                    <span className="btn-inner--icon">
                                        <i className="fas fa-shopping-cart mr-2" />
                                    </span>
                                    <span className="nav-link-inner--text">Upgrade to PRO</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavbarAuth
