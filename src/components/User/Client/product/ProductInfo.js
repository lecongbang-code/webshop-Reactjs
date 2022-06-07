import React, { Component } from 'react'
//import { Link } from 'react-router-dom';
import Imgproductinfo from './Imgproductinfo';
import Infoproduct from './Infoproduct';
import Tabinfo from './Tabinfo';
import Profile from './Profile';
import Productreview from './Productreview';
import Related from './Related';
import Leave from './Leave';

export default class ProductInfo extends Component {

  showProductReview(review) {
    var result = null;
    if (review.length > 0) {
      result = review.map((review, index) => {
        return (
          <Productreview
            review={review}
            key={index}
            index={index}
          />
        );
      });
    }else{
      return(
        <h3>No review ...</h3>
      );
    }
    return result;
  }

  render() {
    var { product, company, review, history} = this.props;
    var { classname1, classname2, classname3, classname4, classname5 } = this.props;
    var { onChange, onSubmit,onClick } = this.props;
    return (

      <div className="container">
        <hr></hr>
        <Imgproductinfo product={product} />

        <Infoproduct product={product} company={company} history={history} />

        <Tabinfo product={product} company={company} />
        <hr></hr>
        <Profile/>
        <br></br>
        <br></br>
        <hr></hr>
        <h1>Product Review</h1>

        {this.showProductReview(review)}

        <hr></hr>
        <Leave
          product={product}
          review={review}
          onChange={onChange}
          onSubmit={onSubmit}
          classname1={classname1}
          classname2={classname2}
          classname3={classname3}
          classname4={classname4}
          classname5={classname5}
          onClick={onClick}
        />
        <hr></hr>
        <Related product={product} history={history} />

      </div>

    )
  }
}
