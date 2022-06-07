import React, { Component } from 'react'

export class FooterContentAdmin extends Component {
    render() {
        return (
            <footer className="footer col pt-0">
                <div className="row align-items-center justify-content-lg-between">
                    <div className="col-lg-3 float-left">
                        <div className="copyright text-center  text-lg-left  text-muted">
                            &copy; 2020 <a href="aaa" className="font-weight-bold ml-1" target="_blank">Creative Tim</a>
                        </div>
                    </div>
                    <div className="col-lg-9 float-right">
                        <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                            <li className="nav-item">
                                <a href="aaa" className="nav-link" target="_blank">Creative Tim</a>
                            </li>
                            <li className="nav-item">
                                <a href="aaa" className="nav-link" target="_blank">About Us</a>
                            </li>
                            <li className="nav-item">
                                <a href="aaa" className="nav-link" target="_blank">Blog</a>
                            </li>
                            <li className="nav-item">
                                <a href="aaa">MIT License</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        )
    }
}

export default FooterContentAdmin
