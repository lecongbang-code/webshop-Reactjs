import React, { Component } from 'react'
import './Rating.css';
export default class ShowRating extends Component {

    showrating(rating){
        if(rating > 0 && rating <=1){ 
            return (
                <div className="rating-box">
                <div className="ratings">
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star-o"></span>
                    <span className="fa fa-star-o"></span>
                    <span className="fa fa-star-o"></span>
                    <span className="fa fa-star-o"></span>
                    <span>({rating})</span>
                </div>
            </div>
            );
        }else if(rating > 1 && rating <=2){
            return (
                <div className="rating-box">
                <div className="ratings">
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star-o"></span>
                    <span className="fa fa-star-o"></span>
                    <span className="fa fa-star-o"></span>
                    <span>({rating})</span>
                </div>
            </div>
            );
        }
        else if(rating > 2 && rating <=3){
            return (
                <div className="rating-box">
                <div className="ratings">
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star-o"></span>
                    <span className="fa fa-star-o"></span>
                    <span>({rating})</span>
                </div>
            </div>
            );
        }
        else if(rating > 3 && rating <=4){
            return (
                <div className="rating-box">
                <div className="ratings">
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star-o"></span>
                    <span>({rating})</span>
                </div>
            </div>
            );
        }
        else if(rating > 4 && rating <=5){
            return (
                <div className="rating-box">
                <div className="ratings">
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span>({rating})</span>
                </div>
            </div>
            );
        }else{
            return (
                <div className="rating-box">
                <div className="ratings">
                    <span className="fa fa-star-o"></span>
                    <span className="fa fa-star-o"></span>
                    <span className="fa fa-star-o"></span>
                    <span className="fa fa-star-o"></span>
                    <span className="fa fa-star-o"></span>
                    <span>({rating})</span>
                </div>
            </div>
            );
        }
    }
    render() {
        var {rating} =this.props;
        return (
            <div>
                {this.showrating(rating)}
            </div>
        )
    }
}
