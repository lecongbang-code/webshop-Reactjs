import React, { Component } from 'react'

export class ListProGroupItem extends Component {
    render() {
        var {proGroup,index}=this.props;  
        return (
            <tr>
                <td>{index+1}</td>
                <td>{proGroup.id}</td>
                <td>{proGroup.name}</td>
                <td>{proGroup.info}</td>
                <td>{proGroup.company}</td>
            </tr>
        )
    }
}

export default ListProGroupItem
