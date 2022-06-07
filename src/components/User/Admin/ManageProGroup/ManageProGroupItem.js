import React, { Component } from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom'; 

export class ManageProGroupItem extends Component {
    constructor(props){
        super(props);
    }
    onDelete=(id)=>{
        swal({
            title: "Are you sure delete this product group?",
            text: "Once deleted, you will not be able to recover this product group!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                this.props.onDelete(id); 
            }
        });
    } 
    render() {
        var { proGroup, index } = this.props;
        return ( 
            <tr>
                <td>{index+1}</td>
                <td>{proGroup.id}</td>
                <td>{proGroup.name}</td>
                <td>{proGroup.info}</td>
                <td>{proGroup.company}</td>
                <td>
                    <Link to={`/admin/productgroup/${proGroup.id}/edit`} className="btn btn-warning n-button-i"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> EDIT</Link>
                    <button type="button" 
                            className="btn btn-danger n-button-i"
                            onClick={()=>this.onDelete(proGroup.id)}
                    >
                        <i className="fa fa-trash" aria-hidden="true"></i> DELETE
                    </button>
                </td>
            </tr>
        )
    }
}

export default ManageProGroupItem
