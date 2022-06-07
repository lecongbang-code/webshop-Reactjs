import React, { Component } from 'react';
import FooterContentAdmin from './FooterContentAdmin';
import NavbarContentAdmin from './NavbarContentAdmin';
// import HeaderContentAdmin from './HeaderContentAdmin';
import MainContentAdmin from './MainContentAdmin';

export class ContentAdmin extends Component {
    render() {
        return (
            <div className="main-content" id="panel">
                {/* Topnav */}
                <div className="col-12">
                    <NavbarContentAdmin />
                </div>
                {/* content */}
                <div className="container mt-5">
                    <MainContentAdmin />
                    <div className="mt-5">
                        <FooterContentAdmin />
                    </div>
                </div>
                
            </div>
        )
    }
    
}

export default ContentAdmin