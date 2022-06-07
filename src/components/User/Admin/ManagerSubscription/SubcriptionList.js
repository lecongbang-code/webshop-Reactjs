import React, { Component } from 'react'

export default class SubcriptionList extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <table className="table align-items-center overflow-auto">
            <thead className="thead-light">
                <tr>
                    <th scope="col" className="sort">ID</th>
                    <th scope="col" className="sort">Image</th>
                    <th scope="col" className="sort">Company Name</th>
                    <th scope="col" className="sort">Plan Name</th>
                    <th scope="col" className="sort">Price</th>
                    <th scope="col" className="sort">Action</th>
                </tr>
            </thead>
            <tbody className="list">
                {this.props.children}
            </tbody>
        </table>
        )
        }
    }

