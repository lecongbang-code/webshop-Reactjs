import React, { Component } from 'react';
import NavbarAuth from '../../components/Auth/NavbarAuth';
import Login from '../../components/Auth/Login';
import FooterAuth from '../../components/Auth/FooterAuth';
import Register from '../../components/Auth/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

import {Route,Switch} from 'react-router-dom';

export class AuthPage extends Component {
    render() {
        return (
            <div>
                {/* Navbar */}
                 <NavbarAuth />
                {/* Main content */}
                <Switch>
                    <Route path="/login"
                        component={Login}
                    />
                    <Route path="/register"
                        component={Register}
                    />
                    <Route
                        component={NotFoundPage}
                    />
                </Switch>
                {/* Footer */}
                <FooterAuth />
                {/* Argon Scripts */}
                {/* Core */}
                {/* Argon JS */}
            </div>

        )
    }
}

export default AuthPage
