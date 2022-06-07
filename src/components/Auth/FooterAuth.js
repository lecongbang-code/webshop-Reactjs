import React, { Component } from 'react'

export class FooterAuth extends Component {
    render() {
        return (
            <footer className="py-5" id="footer-main">
                <div className="container">
                    <div className="row align-items-center justify-content-xl-between">
                        <div className="col-xl-6">
                            <div className="copyright text-center text-xl-left text-muted">
                                © 2020 <a className="font-weight-bold ml-1" href="aaa">Creative Tim</a>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <ul className="nav nav-footer justify-content-center justify-content-xl-end">
                                <li className="nav-item">
                                    <a className="nav-link" href="aaa">Creative Tim</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="aaa">About Us</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="aaa">Blog</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="aaa">MIT License</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default FooterAuth
