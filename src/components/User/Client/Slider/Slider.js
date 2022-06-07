import React, { Component } from 'react'
import './slider.css';

export default class Slider extends Component {
    render() {
        return (
            <div>
                <div className="slide">
                    <div className="dieuhuong">
                        <i className="fa fa-chevron-circle-left"/>
                        <i className="fa fa-chevron-circle-right"/>
                    </div>
                    <div className="chuyen-slide">
                        <img src="assets/img/slider/slide-4.jpg" alt="jsx-a11y/alt-text"/>
                    </div>
                </div>
            </div>
        )
    }
}
