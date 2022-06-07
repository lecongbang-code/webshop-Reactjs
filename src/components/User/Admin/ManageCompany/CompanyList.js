import React, { Component } from 'react';
// import CompanyItem from './CompanyItem';

export class CompanyList extends Component {
    render() {
        
        return (
            <table className="table align-items-center n-tble table-hover">
                <thead className="n-table-title">
                    <tr>
                        <th scope="col" className="sort n-col-big">Number</th>
                        
                        <th scope="col" className="sort n-col-big">Store name</th>
                        
                        <th scope="col" className="sort n-col-big">Phone numer</th>
                        {/* <th scope="col" className="sort n-col-big">>Address</th> */}
                        <th scope="col" className="sort n-col-big">Legal name</th>
                        <th scope="col" className="sort n-col-big">Site</th>
                  
                        {/* <th scope="col" className="sort" >Category</th> */}
                       
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody className="list">
                  {this.props.children}
                </tbody>
            </table>
        )
    }
}

export default CompanyList
