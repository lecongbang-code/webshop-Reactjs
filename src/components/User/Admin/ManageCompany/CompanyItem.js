import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

export class CompanyItem extends Component {

    onDelete = (site) => {
        
        swal({
            title: "Are you want to delete company?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                this.props.onDelete(site); 
              swal("Yeah! Your company has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your imaginary file is safe!");
            }
          });

       }

    render() {

        var {results, index}= this.props;

        return (
            <tr>
                <td>  {index+1}  </td>
                <td><Link to={`/admin/company/${results.site}/detail`}>{results.store_name}</Link></td>
                <td>{results.phone_number}</td>
                {/* <td>{results.address}</td> */}
                <td>{results.legal_name}</td>
                <td>{results.site}</td>
                {/* <td>{results.business_license}</td> */}
            

                <td>
                    <Link to={`/admin/company/${results.site}/edit`} className="btn btn-warning"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> EDIT</Link>
                    <button type="button" onClick={() => this.onDelete(results.site)} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i> DELETE</button>
                    <Link to={`/admin/company/${results.site}/AddSocial`} className="btn btn-warning"><i className="fa fa-plus-square" aria-hidden="true"></i> ADD SOCIAL </Link>
                </td>
            </tr>
        );
        }
}
        


export default CompanyItem
