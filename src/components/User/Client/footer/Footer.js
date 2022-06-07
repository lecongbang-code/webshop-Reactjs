import React, { Component } from 'react'
import './style.css';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
    render() {
        return (
                <footer className="footer-distributed">
                    <div className="footer-left">
                        <h3>a<span>r</span>g<span>o</span>n</h3>
                        <p className="footer-links">
                            <Link to="">Home</Link>
                            <Link to="">Blog</Link>
                            <Link to="">Pricing</Link>
                            <Link to="">About</Link>
                            <Link to="">Faq</Link>
                            <Link to="">Contact</Link>
                        </p>
                        <p className="footer-company-name">argon &copy; 2020</p>
                    </div>
                    <div className="footer-center">
                        <div>
                            <i className="fa fa-map-marker"></i>
                            <p><span>Việt Nam</span> Cần Thơ</p>
                        </div>
                        <div>
                            <i className="fa fa-phone"></i>
                            <p>01234567890</p>
                        </div>
                        <div>
                            <i className="fa fa-envelope"></i>
                            <p><Link to="">argon@argon.com</Link></p>
                        </div>
                    </div>
                    <div className="footer-right">
                        <p className="footer-company-about">
                            <span>About the company</span>
                            argon is Link blog for web designers, graphic designers, web developers &amp;
                             SEO Learner.</p>
                        <div className="footer-icons">
                            <Link to=""><i className="fa fa-facebook"></i></Link>
                            <Link to=""><i className="fa fa-twitter"></i></Link>
                            <Link to=""><i className="fa fa-linkedin"></i></Link>
                            <Link to=""><i className="fa fa-github"></i></Link>
                        </div>
                    </div>
                </footer>
        )
    }
}
