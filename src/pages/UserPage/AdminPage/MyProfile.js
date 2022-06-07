import React, { Component } from 'react';
import callApi from '../../../connect/API-caller';
import swal from 'sweetalert';

export class MyProfile extends Component {
    constructor(props) {
        super(props);
        let logIn = true;
        this.state = {
            results: [],
            token: localStorage.getItem('token'),
            logIn,
            first_name: '',
            last_name: '',
            email: '',
            facebook: '',
            google: '',
            country: '',
            city: '',
            phone_number: '',
            job: '',
            avatar: '',
            avatarValue: null,
            avatarName: '',
            formErrors: {
                first_name: "",
                last_name: "",
                facebook: "",
                google: "",
                phone_number: "",
                country:"",
                city:"",
                job:""
            }
        }
    }
    componentWillMount() {
        console.log(this.state.token)
        callApi('/api/auth/profile', 'GET', null, {
            Authorization: `JWT ${this.state.token}`
        }).then(res => {
            this.setState({
                results: res.data,
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                email: res.data.email,
                facebook: res.data.facebook,
                google: res.data.google,
                country: res.data.country,
                city: res.data.city,
                phone_number: res.data.phone_number,
                job: res.data.job,
                avatar: res.data.avatar,
            })
            console.log(res)
        })
    }
    onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            this.setState({
                [event.target.name]: URL.createObjectURL(event.target.files[0]),
                avatarValue: event.target.files[0],
                avatarName: event.target.files[0].name
            });
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        var { first_name, last_name, email, facebook, google, country, city, phone_number, job, avatar, avatarValue, avatarName } = this.state;
        var formData = new FormData();
        formData.append("first_name", first_name)
        formData.append("last_name", last_name)
        formData.append("email", email)
        formData.append("phone_number", phone_number)
        formData.append("job", job)
        formData.append("country", country)
        formData.append("city", city)
        if (google !== null) {
            formData.append("google", google)
        }
        if (facebook !== null) {
            formData.append("facebook", facebook)
        }

        if (avatarValue !== null) {
            formData.append("avatar", avatarValue, avatarName);
        }
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `JWT ${localStorage.getItem('token')}`);
        var requestOptions = {
            method: 'put',
            headers: myHeaders,
            body: formData,
        };
        fetch(`https://seekproduct-api.misavu.net/api/auth/profile`, requestOptions).then(res => {
            console.log(res)
            if (200 <= res.status < 400) {
                swal({
                    title: "Update Success",
                    icon: "success",
                })

            }
        })

    }

    onHandleChange = (e) => {
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        switch (name) {
            case "first_name":
                formErrors.first_name =
                    value.length < 3 ? "First name is required!" : "";
                break;
            case "last_name":
                formErrors.last_name =
                    value.length < 3 ? "Last name is required!" : "";
                break;
            case "phone_number":
                formErrors.phone_number =
                    value.match(/[0-9]{10,}/) ? "" : "phone_number is required!";
                break;
            case "facebook":
                formErrors.facebook =
                    value.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/) ? "" : "Facebook is invalid!";
                break;
            case "google":
                formErrors.google =
                    value.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/) ? "" : "Google+ is invalid!";
                break;
            case "country":
                formErrors.country =
                    value.match(/[0-9]/) ? "country is required!" : "";
                break;
            case "city":
                formErrors.city =
                    value.match(/[a-zA-Z]{2,}/) ? "" : "city is required!";
                break;
            case "job":
                formErrors.job =
                    value.match(/[a-zA-Z]{2,}/) ? "" : "job is required!";
                break;
            default:
                break;
        }
        this.setState({
            formErrors,
            [e.target.name]: e.target.value
        });
    }
    showavatar(){
        var img =this.state.avatar;
        if(img!=null){
            return(img);

        }else{
            return("/assets/img/brand/avatar.png")
        }

    }

    render() {
        const { formErrors } = this.state;
        return (
            <form className="mt-2 n-form-admin" onSubmit={this.onSubmit}>
                <div className="row col">
                    <div className="form-group col-5">
                        <label className="mr-5">USER PHOTO:</label>
                            <label htmlFor="logoImage" className="btn btn-icon btn-success">
                            <i className="fa fa-calendar-check-o" aria-hidden="true">
                            </i> Chose Image</label>
                            <img  id="target"  src={this.showavatar()} height={150}   />
                            <input type="file" 
                            
                                className="form-control n-input-file"
                                id="logoImage" 
                                accept="image/jpeg, image/png"
                                autoComplete="off"
                                name="avatar"
                                
                                onChange={this.onImageChange}
                             />
                    </div>
                    <div className="form-group col-6">
                        <label>EMAIL:</label>
                        <label className="form-control" >
                            {this.state.email}
                        </label>
                    </div>
                </div>
                <div className="row col">

                <div className="form-group col-6">
                        <label> FIRST_NAME:</label>
                        <input type="text"
                            value={this.state.first_name}
                            className="form-control"
                            name='first_name'
                            onChange={this.onHandleChange}
                        />
                        {formErrors.first_name.length > 0 && (
                            <span className="errorMessage ">{formErrors.first_name}</span>
                        )}
                    </div>
                    <div className="form-group col-6">
                        <label>LAST_NAME:</label>
                        <input type="text"
                            value={this.state.last_name}
                            className="form-control"
                            name='last_name'
                            onChange={this.onHandleChange}
                        />
                        {formErrors.last_name.length > 0 && (
                            <span className="errorMessage ">{formErrors.last_name}</span>
                        )}
                    </div>
                   
                    <div className="form-group col-6">
                        <label>FACEBOOK: </label>
                        <input type="text"
                            pattern="(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})"
                            value={this.state.facebook}
                           
                            className="form-control"
                            name='facebook'
                            onChange={this.onHandleChange}
                        />
                        {formErrors.facebook.length > 0 && (
                            <span className="errorMessage ">{formErrors.facebook}</span>
                        )}
                    </div>
                    <div className="form-group col-6">
                        <label>GOOGLE+:</label>
                        <input type="text"
                            pattern="(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})"
                            value={this.state.google}
                            className="form-control"
                            name='google'
                            onChange={this.onHandleChange}
                        />
                        {formErrors.google.length > 0 && (
                            <span className="errorMessage ">{formErrors.google}</span>
                        )}
                    </div>
                    <div className="form-group col-6">
                        <label>COUNTRY :</label>
                        <input type="text"
                            pattern="[^0-9]{1,15}" 
                            value={this.state.country}
                            className="form-control"
                            name='country'
                            onChange={this.onHandleChange}
                        />
                        {formErrors.country.length > 0 && (
                            <span className="errorMessage ">{formErrors.country}</span>
                        )}
                    </div>
                    <div className="form-group col-6">
                        <label>CITY :</label>
                        <input type="text"
                            pattern="[^0-9]{2,}"
                            value={this.state.city}
                            className="form-control"
                            name='city'
                            onChange={this.onHandleChange}
                        />
                        {formErrors.city.length > 0 && (
                            <span className="errorMessage ">{formErrors.city}</span>
                        )}
                    </div>
                    <div className="form-group col-6">
                        <label>PHONE NUMBER :</label>
                        <input type="text"
                            pattern="[0-9]{10,}"
                            value={this.state.phone_number}
                            className="form-control"
                            name='phone_number'
                            onChange={this.onHandleChange}
                        />
                        {formErrors.phone_number.length > 0 && (
                            <span className="errorMessage ">{formErrors.phone_number}</span>
                        )}
                    </div>
                    <div className="form-group col-6">
                        <label>JOB:</label>
                        <input type="text"
                            pattern="[^0-9]{2,}"
                            value={this.state.job}
                            className="form-control"
                            name='job'
                            onChange={this.onHandleChange}
                        />
                        {formErrors.job.length > 0 && (
                            <span className="errorMessage ">{formErrors.job}</span>
                        )}
                    </div>
                    
                    
                </div>
                <div className="row col-3">
                    <button type="submit" className="btn btn-primary">UPDATE PROFILE</button>
                </div>
                
            </form>

        )
    }
}

export default MyProfile
