import React, { Component } from 'react'
import './stylecategorie.css';
import CategoriesItem from './CategoriesItem';

export default class Categories extends Component {

    showCategory(category) {
        var result = null;
        if (category.length > 0) {
            result = category.map((category, index) => {
                if (category.id <= 21) {
                    return (
                        <CategoriesItem category={category} key={index} />
                    );
                }
            });
        }
        return result;
    }

    render() {
        var { category } = this.props;
        return (
            <div className="container">
                <div className="categories" >
                    <h2>Popular Categories</h2>
                </div>
                <div className="linkcategories">
                    {this.showCategory(category)}
                </div>
            </div>
        )
    }
}
