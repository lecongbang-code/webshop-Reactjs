import React, { Component } from 'react';
import NavbarAdmin from '../../../components/User/Admin/NavbarAdmin';
import ContentAdmin from '../../../components/User/Admin/ContentAdmin';

export class AdminPage extends Component {
    render() {
        return (
            <div>     
                {/* // navbar */}
                    <NavbarAdmin />
                {/* // content */}
                    <ContentAdmin />
            </div>
        )
    }
}

export default AdminPage
