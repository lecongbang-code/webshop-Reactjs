import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import callApi from './../../../../connect/API-caller';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: []
        };
    }
    componentDidMount(){
        callApi('/api/auth/profile', 'GET', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            if (res) {
                this.setState({
                    profile: res.data
                });
            }
        }).catch(err => {
            //console.log(err);
        });
    }
    render() {
        var {profile} = this.state;
        return (
            <div className="profile">
                    <h4>Company</h4>
                    <div className="profile-left">
                        <div className="profile-img-detail">
                            <img alt="avatar"
                                width="250"
                                height="150"
                                src="https://s3-ap-southeast-2.amazonaws.com/sq.mo.works/company/c0f8a037-169f-40ed-a50f-7539f4dd77de.jpg" />
                        </div>
                        <div className="product-text">
                            <div >
                                <Link to="" routerlinkactive="router-link-active" href="#/company/68">
                                    <i className="fas fa-print"></i>
                                    More Items
                                </Link>
                            </div>
                            <hr></hr>
                            <div >
                                <Link to="" href="mailto:khang12@seekproduct.com">
                                    <i className="fas fa-envelope"></i>
                                    Email Us!
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="profile-right">
                        <form className="formcompany form-group">
                            <div>
                                <input
                                name="name"
                                placeholder="Name"
                                required=""
                                type="text"
                                value={profile.last_name}
                                className="form-control" />
                            </div>
                            <div>
                                <input
                                name="number"
                                placeholder="Phone Number"
                                required=""
                                type="text"
                                value={profile.phone_number}
                                className="form-control" />
                            </div>
                            <div>
                                <input
                                name="email"
                                placeholder="Email Address"
                                required=""
                                type="text"
                                value={profile.email}
                                className="form-control" />
                            </div>
                            <div>
                            <textarea 
                            cols="60" 
                            name="message" 
                            placeholder="Message" 
                            required="" 
                            rows="5" 
                            className="form-control"></textarea>
                            </div>
                            <div className="email-address">
                                <div className="g-recaptcha" data-callback="callback" data-sitekey="6Ld-74MUAAAAAMvt_4ZrUeTSy2cubhOrslcgPwWG">
                                        <div>
                                            <iframe src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;
                                            k=6Ld-74MUAAAAAMvt_4ZrUeTSy2cubhOrslcgPwWG&amp;
                                            co=aHR0cHM6Ly9zZWVrcHJvZHVjdC5taXNhdnUubmV0OjQ0Mw..&amp;
                                            hl=vi&amp;v=NMoy4HgGiLr5NAQaEQa2ho8X&amp;size=normal&amp;
                                            cb=2dkk9tqf1a1m" width="304" height="78" role="presentation" 
                                            name="Link-orvg4h4uki00" 
                                            frameBorder="0" scrolling="no" 
                                            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation 
                                            allow-modals allow-popups-to-escape-sandbox">
                                            </iframe>
                                        </div>
                                </div>
                            </div>
                            <div>
                            <button
                            className="btn btn-outline-default disabled" 
                            type="submit" 
                            disabled>Send Contact Form</button>
                            </div>
                        </form>
                    </div>
                </div>
        )
    }
}
