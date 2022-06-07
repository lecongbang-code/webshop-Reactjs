import React, { Component } from 'react';

export class ProductList extends Component {
    constructor(props){
        super(props);
    }
    
    render() { 
        return (
            <table className="table align-items-center n-tble table-hover table-responsive col-12">
                <thead className="n-table-title col-12">
                    <tr>
                        <th scope="col" className="sort n-col-big">Number</th>
                        <th scope="col" className="sort n-col-big">Id</th>
                        <th scope="col" className="sort n-col-big">Name</th>
                        <th scope="col" className="sort n-col-big">Price</th>
                        <th scope="col" className="sort n-col-big">Image</th>
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

export default ProductList
