import React, { Component } from 'react'
import './Rating.css';

export default class Rating extends Component {

    onClick = (name) => {
        this.props.onClick(name);
    }
    render() {
        var { classname1, classname2, classname3, classname4, classname5 } = this.props;
        return (
            <div className="rating-box">
                <div className="ratings">
                    <span className={classname1} name="1" onClick={() => this.onClick(1)}></span>
                    <span className={classname2} name="2" onClick={() => this.onClick(2)}></span>
                    <span className={classname3} name="3" onClick={() => this.onClick(3)}></span>
                    <span className={classname4} name="4" onClick={() => this.onClick(4)}></span>
                    <span className={classname5} name="5" onClick={() => this.onClick(5)}></span>
                </div>
            </div>
        )
    }
}
