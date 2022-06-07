import React, { Component } from 'react'
import Profile from '../../../components/User/Client/product/Profile'
import NavbarUser from '../../../components/User/Client/NavbarUser'
import Footer from '../../../components/User/Client/footer/Footer'

export default class Contact extends Component {
    render() {
        var {history} = this.props;
        return (
            <div>
                <NavbarUser history={history}/>
                <div className="mrbot-br"><br></br></div>
                <div class="container">
                <Profile/>
                </div>
                <Footer/>
            </div>
        )
    }
}
