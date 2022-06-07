import React, { Component } from 'react';

export class ManageProGroupList extends Component {
    render() {
        return (
            <table className="table align-items-center n-tble table-hover">
                <thead className="n-table-title">
                    <tr>
                        <th scope="col" className="sort n-col-big">Number</th>
                        <th scope="col" className="sort n-col-big">Id</th>
                        <th scope="col" className="sort n-col-big">Name</th>
                        <th scope="col" className="sort n-col-big">Info</th>
                        <th scope="col" className="sort n-col-big">Company</th>
                        <th scope="col" className="sort n-col-big">Action</th>
                    </tr>
                </thead>
                <tbody className="list">
                    {this.props.children}
                </tbody>
            </table>
            
        )
    }
}

export default ManageProGroupList
