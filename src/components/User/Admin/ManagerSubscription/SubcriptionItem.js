import React, { Component } from 'react'
import swal from 'sweetalert'
export default class SubcriptionItem extends Component {
    constructor(props) {
        super(props)
    }
    onDelete = (id) => {
        swal({
            title: "Are you sure delete this subcription?",
            text: "Once deleted, you will not be able to recover this subcription!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.props.onDelete(id);
                }
            }).catch(err => {
                swal({
                    title: "Add Error",
                    text: `${err}`,
                    icon: "warning",
                    dangerMode: true,
                })
                console.log(err)
            });
    }
    render() {
        var { subcription, index } = this.props;    
        return (
            <tr>
            <td>{index + 1}</td>
            <td><img width={100} src={subcription.company.logo} /></td>
            <td>{subcription.company.store_name}</td>
            <td>{subcription.plan.name}</td>
            <td>{subcription.plan.price}  {subcription.plan.currency}</td>
            <td>
                <button type="button"
                    className="fa fa-trash btn btn-danger btn-sm"
                    onClick={() => this.onDelete(subcription.company.id)}
                >
                </button>
            </td>
        </tr>
        )
    }
}
