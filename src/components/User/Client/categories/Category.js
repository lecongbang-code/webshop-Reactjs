import React, { Component } from 'react'

export default class Category extends Component {
    render() {
        var {category} = this.props;
        return (
            <div>
                <h4>{category.name}</h4>
            </div>
        )
    }
}
