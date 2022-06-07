import React, { Component } from 'react'
import Rating from './Rating/Rating';
export default class Leave extends Component {

    onChange = (e) => {
        this.props.onChange(e);
    }

    onSubmit = (e) => {
        this.props.onSubmit(e);
    }

    render() {
        var { classname1, classname2, classname3, classname4, classname5 } = this.props;
        var { onClick } = this.props;
        return (
            <div className="relatedlistings">
                <h4>Leave a Review</h4>
                <div className="rowformcompany">
                    <form className="form-group " onSubmit={this.onSubmit}>
                        
                        <Rating
                        classname1={classname1}
                        classname2={classname2}
                        classname3={classname3}
                        classname4={classname4}
                        classname5={classname5}
                        onClick={onClick}
                        />
                        
                        <div>
                            <textarea
                                cols="60"
                                name="content"
                                placeholder="Your Review"
                                required=""
                                rows="5"
                                onChange={this.onChange}
                                className="form-control"></textarea>
                        </div>

                        <div className="mrauto">
                            <button
                                className="btn btn-outline-default "
                                type="submit"
                                disabled="">Submit Review</button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}
