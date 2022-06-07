import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class CategoriesItem extends Component {
    render() {
        var{category} = this.props;
        return (
            <div className="categoriesitem">
                <div><Link to={`/searchCategory/${category.name}`}><p>{category.name.substr(0, 20)}</p></Link></div>
            </div>
        )
    }
}
