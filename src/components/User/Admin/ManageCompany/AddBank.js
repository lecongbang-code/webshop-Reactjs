import React, { Component } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import callApi from '../../../../connect/API-caller';




export class AddBank extends Component {


   

    constructor(props) {
        super(props);
        let logIn = true;
        this.state = {
            results: [],



            token: localStorage.getItem('token'),
            logIn


        }


    }

    componentWillMount() {
        console.log(this.state.token)
        callApi('/api/user/company/my-company/', 'GET', null, {
            Authorization: `JWT ${this.state.token}`
        }).then(res => {
            console.log(res.data.results)
          
            localStorage.setItem('site', res.data.results.site);
            this.setState({

                results: res.data.results

            })
        })
    }





    render() {
        
       
        return (
            // <div className="mt-3">
                
            //     <table className="table align-items-center n-tble">
            //         <thead className="thead-dark">
            //             <tr>
            //                 <th scope="col" className="sort">Number</th>
            //                 <th scope="col" className="sort">Store name</th>
                         
            //                 <th scope="col" className="sort">Address</th>
            //                 <th scope="col" className="sort">Legal name</th>
            //                 <th scope="col" className="sort">Site</th>
                            
            //                 <th scope="col">Action</th>
            //             </tr>
            //         </thead>
            //         <tbody className="list">



            //             {this.state.results.map((results, index) => (
            //                 <tr key={index}>
            //                     <td>  {index + 1}  </td>
            //                     <td>{results.store_name}</td>
                               
            //                     <td>{results.address}</td>
            //                     <td>{results.legal_name}</td>
            //                     <td site_company={results.site} >{results.site}</td>
                               
            //                     <td>
            //                         {/* <Link to={`admin/comany/${results.id}/addbank`} className="btn btn-outline-warning"> ADD BANK </Link> */}
            //                         <Link to={`/admin/company/${results.site}/AddSocial`} className="btn btn-outline-success"> ADD SOCIAL </Link>
            //                     </td>
            //                 </tr>
            //             ))}

            //         </tbody>
            //     </table>
            // </div>
            <div className="mt-3 n-form-admin">
                
                <table className="table align-items-center n-tble table-hover">
                    <thead className="n-table-title">
                        <tr>
                            <th scope="col" className="sort">Number</th>
                            <th scope="col" className="sort">Store name</th>
                         
                            <th scope="col" className="sort">Address</th>
                            <th scope="col" className="sort">Legal name</th>
                            <th scope="col" className="sort">Site</th>
                            
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className="list">



                        {this.state.results.map((results, index) => (
                            <tr key={index}>
                                <td>  {index + 1}  </td>
                                <td>{results.store_name}</td>
                               
                                <td>{results.address}</td>
                                <td>{results.legal_name}</td>
                                <td site_company={results.site} >{results.site}</td>
                               
                                <td>
                                    {/* <Link to={`admin/comany/${results.id}/addbank`} className="btn btn-outline-warning"> ADD BANK </Link> */}
                                    <Link to={`/admin/company/${results.site}/AddSocial`} className="btn btn-warning"><i className="fa fa-plus-square" aria-hidden="true"></i> ADD SOCIAL </Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        );
    }
}



export default AddBank
