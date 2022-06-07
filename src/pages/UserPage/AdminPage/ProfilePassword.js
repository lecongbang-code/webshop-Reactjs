import React, { Component } from 'react';
import callApi from '../../../connect/API-caller';
import swal from 'sweetalert';
export class ProfilePassword extends Component {
    constructor(props) {
        super(props);
        let logIn = true;
        this.state = {
            results: [],
            token: localStorage.getItem('token'),
            logIn,
            old_password: '',
            new_password: '',
            confirm_password: ''
        }
    }
    componentWillMount() {
        console.log(this.state.token)
        callApi('/api/auth/change_pass', 'GET', null, {
            Authorization: `JWT ${this.state.token}`
        }).then(res => {

            console.log(res)
        })
    }
    onSubmit = (e) => {
        const HandF = this.HandingForm()
        e.preventDefault();
        var { old_password, new_password, confirm_password } = this.state;
        callApi('/api/auth/change_pass', 'PUT', {
            old_password: old_password,
            new_password: new_password,
            confirm_password: confirm_password
        }, {
            Authorization: `JWT ${this.state.token}`
        }).then(result => {
            // this.props.history.push('/product')
            if (result.status === 200) {
                let token = result.data.token;
                localStorage.setItem('token', token);
                this.setState({
                    logIn: true
                });
                console.log(result)
                swal("Great!", "Update Succsess!", "success")
            }
        }).catch(err => {

            if (HandF.error) {
                alert(HandF.messagebox)
            }
            console.log(err)
        });

    }
    onHandleChange = (e) => {
        let value = e.target.value,
            name = e.target.name;
        this.setState({
            [name]: value
        });
    }
    HandingForm() {
        let returnDB = {
            error: false,
            messagebox: ''
        }
        const { new_password, confirm_password } = this.state
        //email
        const ktpw = /^[a-z0-9_-]{6,18}$/;
        //mật khẩu
        if (!ktpw.test(new_password)) {
            returnDB = {
                error: true,
                messagebox: 'Incorrect password format, a-z,0-9,6-18 charaters'
            }
        } else
            // nhập lại mk
            if (confirm_password !== new_password) {
                returnDB = {
                    error: true,
                    messagebox: 'Password incorrect'
                }
            } else {
                returnDB = {
                    error: true,
                    messagebox: 'Old password is incorrect'
                }
            }
        return returnDB;
    }
    render() {
        const { formErrors } = this.state;
        return (

            <form className="mt-2 n-form-admin" onSubmit={this.onSubmit}>

                <div className="row col">

                    <div className="form-group col-6">
                        <label> OLD PASSWORD:</label>
                        <input type="password"
                            value={this.state.first_name}
                            className="form-control"
                            name='old_password'
                            onChange={this.onHandleChange}
                        />
                    </div>
                    <div className="form-group col-6">
                        <label>NEW PASSWORD:</label>
                        <input type="password"
                            value={this.state.last_name}
                            className="form-control"
                            name='new_password'
                            onChange={this.onHandleChange}
                        />
                    </div>
                    <div className="form-group col-6">
                        <label>COMFIRM PASSWORD: </label>
                        <input type="password"
                            value={this.state.facebook}
                            className="form-control"
                            name='confirm_password'
                            onChange={this.onHandleChange}
                        />
                    </div>
                </div>
                <div className="row col-3">
                    <button type="submit" className="btn btn-primary">UPDATE PASSWORD</button>
                </div>
                
            </form>

        )
    }
}

export default ProfilePassword