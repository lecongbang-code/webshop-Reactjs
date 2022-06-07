import React, { Component } from 'react'

export class NotFoundPage extends Component {
    render() {
        return (
            <div className="alert alert-warning mt-5 mb-5" role="alert">
                <span className="alert-icon"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span>
                <span className="alert-text"><strong>Warning!</strong> Page Not Found !</span>
            </div>
        )
    }
}

export default NotFoundPage
