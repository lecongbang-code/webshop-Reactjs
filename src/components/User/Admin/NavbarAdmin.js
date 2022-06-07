
import React, { Component } from 'react';
import { Link,NavLink } from 'react-router-dom';
import './Admin.css'
export class NavbarAdmin extends Component {
    render() {
        return (
            <nav className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light" id="sidenav-main">
                <div className="sidenav-header align-items-center">
                    <Link to="/" className="navbar-brand">
                        <img src="/assets/img/brand/blue.png" className="navbar-brand-img" alt="image" />
                    </Link>
                </div>
                <div id="accordion">
                    <div className="card">
                        <div id="headingOne" className="n-navAd-cardhead">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <span><i className="ni ni-badge"></i>Manage Company</span>
                                </button>
                            </h5>
                        </div>
                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                            <div className="card-body n-navAd-cardbody">
                                <Link to='/admin/company'>
                                    <button className="nav-item btn btn-link active">
                                        <span className="nav-link-text">List Company</span>
                                    </button>
                                </Link>
                                <Link to='/admin/company/listdelete'>
                                    <button className="nav-item btn btn-link active">
                                        <span className="nav-link-text">List Delete</span>
                                    </button>
                                </Link>
                                {/* <Link to='/admin/company/add_bank'>
                                    <button className="nav-item btn btn-link active">
                                        <span className="nav-link-text">Add Social</span>
                                    </button>
                                </Link> */}
                            </div>
                        </div>
                    </div>
                    <div className="card n-mt-am25">
                        <div id="headingtwo" className="n-navAd-cardhead">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed n-button-link" data-toggle="collapse" data-target="#collapsetwo" aria-expanded="false" aria-controls="collapsetwo">
                                    <span><i className="ni ni-ungroup n-icon"></i>Manage Subsprition</span>
                                </button>
                            </h5>
                        </div>
                        <div id="collapsetwo" className="collapse" aria-labelledby="headingtwo" data-parent="#accordion">
                            <div className="card-body n-navAd-cardbody">
                                <Link to='/subscription'>
                                        <button className="nav-item btn btn-link active">
                                            <span className="nav-link-text">List Subsprition</span>
                                        </button>
                                </Link>
                                {/* <Link to='...'>
                                        <button className="nav-item btn btn-link active">
                                            <span className="nav-link-text">List Company</span>
                                        </button>
                                </Link>
                                <Link to='...'>
                                        <button className="nav-item btn btn-link active">
                                            <span className="nav-link-text">List Company</span>
                                        </button>
                                </Link> */}
                            </div>
                        </div>
                    </div>
                    <div className="card n-mt-am25">
                    <div id="headingThree" className="n-navAd-cardhead">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed n-button-link" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    <span><i className="ni ni-tv-2 n-icon"></i>Manage Product</span>
                                </button>
                            </h5>
                        </div>
                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                            <div className="card-body n-navAd-cardbody">
                                <Link to='/admin/populerproduct'>
                                    <button className="nav-item btn btn-link active">
                                        <span className="nav-link-text">Populer Product</span>
                                    </button>
                                </Link>
                                <Link to='/admin/product'>
                                    <button className="nav-item btn btn-link active">
                                        <span className="nav-link-text">My Product</span>
                                    </button>
                                </Link>
                                <Link to='/admin/listdelproduct'>
                                    <button className="nav-item btn btn-link active">
                                        <span className="nav-link-text">List Delete</span>
                                    </button>
                                </Link>
                                {/* <Link to='/admin/product/add'>
                                    <button className="nav-item btn btn-link active">
                                        <span className="nav-link-text">Add Product</span>
                                    </button>
                                </Link> */}
                            </div>
                        </div>
                    </div>
                    <div className="card n-mt-am25">
                    <div id="headingfour" className="n-navAd-cardhead">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed n-button-link" data-toggle="collapse" data-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
                                    <span><i className="ni ni-ungroup n-icon"></i>Manage ProductGroup</span>
                                </button>
                            </h5>
                        </div>
                        <div id="collapsefour" className="collapse" aria-labelledby="headingfour" data-parent="#accordion">
                            <div className="card-body n-navAd-cardbody">
                                <Link to='/admin/listproductgroup'>
                                    <button className="nav-item btn btn-link active">
                                        <span className="nav-link-text">List Product Group</span>
                                    </button>
                                </Link>
                                <Link to='/admin/productgroup'>
                                    <button className="nav-item btn btn-link active">
                                        <span className="nav-link-text">My Product Group</span>
                                    </button>
                                </Link>
                                {/* <Link to='/admin/productgroup/add'>
                                    <button className="nav-item btn btn-link active">
                                        <span className="nav-link-text">Add Product Group</span>
                                    </button>
                                </Link> */}
                            </div>
                        </div>
                    </div>
                    <div className="card n-mt-am25">
                        <div id="headingfive" className="n-navAd-cardhead">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed n-button-link" data-toggle="collapse" data-target="#collapsefive" aria-expanded="false" aria-controls="collapsefive">
                                    <span><i className="ni ni-circle-08 n-icon"></i>My Profile</span>
                                </button>
                            </h5>
                        </div>
                        <div id="collapsefive" className="collapse" aria-labelledby="headingfive" data-parent="#accordion">
                            <div className="card-body n-navAd-cardbody">
                                <Link to='/admin/profile'>
                                    <button className="nav-item btn btn-link active">
                                        <span className="nav-link-text">My Profile</span>
                                    </button>
                                </Link>
                                <Link to='/admin/updatepassword'>
                                    <button className="nav-item btn btn-link active">
                                        <span className="nav-link-text">Update Password</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        )
    }
}

export default NavbarAdmin
