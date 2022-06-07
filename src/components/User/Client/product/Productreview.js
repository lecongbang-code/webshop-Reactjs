import React, { Component } from 'react'
import ShowRating from './Rating/ShowRating';

export default class Productreview extends Component {

    showimgreview(){
        var img = this.props.review.user_details.avatar;
        if(img != null){
            return(img);
        }else{
            return("/assets/img/user/iconavatar.jpg");
        }
    }

    render() {
        var { review } = this.props;
        return (
            <div className="productreview">
                    <div className="review-details">

                    <div className="avatar">
                        <img src={this.showimgreview()} className="img-responsive" alt="jsx-a11y/img-redundant-alt"/>
                    </div>

                    <div className="review-author">
                        <h3>{review.name}</h3>
                        <h4>{review.created_at}</h4>
                        <h4>{review.content}</h4>
                    </div>

                    </div>

                    <div className="review-right">
                        <div className="ratingreview">
                            <ShowRating rating={review.rating}/>
                        </div>
                        <div className="rareview">
                            <i className="fas fa-flag">-Flag this review</i>
                        </div>
                    </div>
                </div>
        )
    }
}
