import React, { Component } from 'react'
import NavbarAdmin from '../NavbarAdmin'
import ContentAdmin from '../ContentAdmin'
import callApi from '../../../../connect/API-caller';
import { Link } from 'react-router-dom';
import PlacesAutocomplete from 'reactjs-places-autocomplete';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'reactjs-places-autocomplete';
  import Pagination from "react-js-pagination";

export default class ListDelectCompany extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // id: '',
            // user: '',
            // store_name: '',
            // address: '',
            // phone_number: '',
            // site: '',
            // legal_name:'',
            // business_license:'',
            // about: '',
            // catagory:'',
            listcompany: [],
            token: localStorage.getItem('token'),
            activePage: 1

            //   keyy: localStorage.getItem('site')
        }
    }

    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }
    componentDidMount() {


        callApi(`/api/user/company/deleted/`, 'GET', null, { Authorization: `JWT ${this.state.token}` }).then(res => {
            var data = res.data.results;

            //   console.log(data);

            data.forEach(element => {
                console.log(element.user);
            });


            this.setState({


                listcompany: data
                // id: data.id,
                // user: data.user,
                // store_name: data.store_name, 
                // address: data.address,
                //  phone_number: data.phone_number,
                // legal_name: data.legal_name,
                // site:data.site,
                // business_license: data.business_license,
                // about: data.about,
                // category: data.category
            });
        });
    }
    hiden = () => {
        this.state.listcompany.map((company, i) => (

            <div  >
                <div>{company.user}</div>
                <div>{company.store_name}</div>
                <div>{company.address}</div>
                <div>{company.phone_number}</div>
                <div>{company.legal_name}</div>
                <div>{company.site}</div>
                <div>{company.business_license}</div>
                <div>{company.about}</div>
                <div>{company.category}</div>


            </div>
        )

        );
    }


    render() {
        var page = this.state.activePage;
        var temp;
        var { id, user, store_name, address, phone_number, legal_name, site, business_license, about, category } = this.state
         console.log(this.state.listcompany)
         let listcompany = this.state.listcompany
         var result = listcompany.map((compa, index) => {
            temp = listcompany;
            if (index >= (page - 1) * 5) {
                if (index < page * 5) {
                    return (
                    //     <CompanyItem
                    //     key={index}
                    //     listcompany={compa}
                    //     index={index}
                    //     onDelete={this.onDelete}
                    // />
                    <tr key={index}>
                                <th className="table-primary"  >{index + 1}</th>
                                <th scope="row" >{compa.id}</th>
                                <td >{compa.user}</td>
                                <td>{compa.store_name}</td>
                                {/* <td>{compa.address}</td> */}
                                <td>{compa.phone_number}</td>
                                <td>{compa.legal_name}</td>
                                <td>{compa.site}</td>
                                <td>{compa.business_license}</td>
                                {/* <td>{compa.about}</td> */}
                            </tr> 
                    );
                } else { return (<tr key={index}></tr>); }
            } else { return (<tr key={index}></tr>); }
        });

        if (temp) {
            return (
                <div>
              
                <div className="container">
                    <div className="n-form-admin n-mb-20 col-12">
                        {/* <div className="text-right n-product-right">
                            <Link to="/admin/company/add" className="btn btn-primary n-product-left"><i className="fa fa-plus-square" aria-hidden="true"></i> Add COMPANY</Link>
                        </div> */}
                        <h1 className="n-title">LIST DELETE COMPANY</h1>
                    </div>
                    <div className="n-form-admin">
                    <table className="table align-items-center n-tble table-hover">
                        <thead className="n-table-title">
                            <tr >
                                <th scope="col" className="n-col-big">NUMBER</th>
                                <th scope="col" className="n-col-big">ID</th>
                                <th scope="col" className="n-col-big">USER</th>
                                <th scope="col" className="n-col-big">STORE NAME</th>
                                {/* <th scope="col" className="n-col-big">ADDRESS</th> */}
                                <th scope="col" className="n-col-big">PHONE NUMBER</th>
                                <th scope="col" className="n-col-big">LEGAL NAME</th>
                                <th scope="col" className="n-col-big">SITE</th>
                                <th scope="col" className="n-col-big">BUSINESS LICENSE</th>
                                {/* <th scope="col">ABOUT</th> */}
                            </tr>
                        </thead>
                        <tbody className="list">
                        {/* {this.state.listcompany.map((company, i) => (
                           
                            <tr key={i}>
                                <th className="table-primary"  >{i + 1}</th>
                                <th scope="row" >{company.id}</th>
                                <td >{company.user}</td>
                                <td>{company.store_name}</td>
                                <td>{company.address}</td>
                                <td>{company.phone_number}</td>
                                <td>{company.legal_name}</td>
                                <td>{company.site}</td>
                                <td>{company.business_license}</td>
                                <td>{company.about}</td>
                            </tr> */}
                        {/* ))
                        } */}
                        {result}
                        </tbody>
                    </table>

                    </div>
                </div>

                <div className="col-3 row mt-3">
                        <Pagination
                            itemClass="page-item"
                            linkClass="page-link"
                    activePage={this.state.activePage}
                    itemsCountPerPage={5}
                    totalItemsCount={this.state.listcompany.length}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                />
                </div>
    </div >
            )
        } else {
            return (
                <div>
                    <div className="n-form-admin n-mb-20">
                    <h1 className="n-title">LIST DELETE COMPANY</h1>
                    </div>
                    
                        <h2 className="text-center">Loading....</h2>
                    
                </div>
            )
        }


      
     
    //   return (
          
    //         <div>
    //             <div className="n-form-admin n-mb-20">
    //                 <h1 className="n-title">LIST DELETE COMPANY</h1>
    //             </div>
    //             <div className="n-form-admin">
    //                 <table className="table align-items-center n-tble table-hover">
    //                     <thead className="n-table-title">
    //                         <tr >
    //                             <th scope="col">#</th>
    //                             <th scope="col">ID</th>
    //                             <th scope="col">USER</th>
    //                             <th scope="col">STORE NAME</th>
    //                             <th scope="col">ADDRESS</th>
    //                             <th scope="col">PHONE NUMBER</th>
    //                             <th scope="col">LEGAL NAME</th>
    //                             <th scope="col">SITE</th>
    //                             <th scope="col">BUSINESS LICENSE</th>
    //                             <th scope="col">ABOUT</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody className="list">
    //                     {this.state.listcompany.map((company, i) => (
                           
    //                         <tr key={i}>
    //                             <th className="table-primary"  >{i + 1}</th>
    //                             <th scope="row" >{company.id}</th>
    //                             <td >{company.user}</td>
    //                             <td>{company.store_name}</td>
    //                             <td>{company.address}</td>
    //                             <td>{company.phone_number}</td>
    //                             <td>{company.legal_name}</td>
    //                             <td>{company.site}</td>
    //                             <td>{company.business_license}</td>
    //                             <td>{company.about}</td>
    //                         </tr>
    //                     ))
    //                     }
    //                     </tbody>
    //                 </table>
    //                 <div>
    //                     <div>
    //                         <Pagination
    //                             activePage={this.state.activePage}
    //                             itemsCountPerPage={6}
    //                             totalItemsCount={6}
    //                             pageRangeDisplayed={6}
    //                             onChange={this.handlePageChange.bind(this)}
    //                         />
    //                     </div>


    //                 </div>
    //             </div>
    //             <Link to="/admin/company" type="button" className="btn btn-outline-default">Come back</Link>




                
    //        </div>
    //    )
    }

}


