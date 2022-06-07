import React, { Component } from 'react'
import axios from "axios";
import swal from 'sweetalert'
export default class VerificationCompany extends Component {
constructor(props){
    super(props)
    this.state={

        first_name: "",
        last_name: "",
        dob_day: "",
        dob_month: "",
        dob_year: "",
        city: "",
        state: "",
        line: "",
        postal_code: "",
        tax_id: "",
        photo: "",


    }
}
onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSubmit=(event)=>{
    event.preventDefault();
    let  token = localStorage.getItem("token");
    let url = 'http://172.104.50.113:886'
    let {first_name, last_name, dob_day, dob_month, dob_year, city, state, line, postal_code, photo, tax_id} = this.state
    let bank_token= 0;
    let formData = new FormData();
    formData.append("company_id");
    formData.append("bussiness_name");
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("dob_day", dob_day);
    formData.append("dob_month", dob_month);
    formData.append("dob_year", dob_year);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("line1", line);
    formData.append("postal_code", postal_code);
    formData.append("bussiness_tax_id", tax_id);
    formData.append("business_license", "");
    formData.append("bank_token", bank_token);
    // if (information.avatar) {
    //   formData.append("photo_id_front", avatar, avatar.name);
    // }
    axios
      .post(`${url}/api/user/company/verification/`, formData, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        // setIsLoading(false);
        // NotificationManager.success("Verify success!")
      })
      .catch(() => {
        // setIsLoading(false);
        // NotificationManager.error("Verify fail! Please check your information")
      });
  };





    render() {

        return (
            <div>
                <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="card">
              <div className="card-header card-header-primary">
                <h4 className="card-title">Verify account</h4>
                <p className="card-category">Fill out your info </p>
              </div>
              <div className="card-body">
                <form >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>First name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="first_name"
                        //   value={information.first_name}
                        //   onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Last name</label>
                        <input
                          type="Text"
                          className="form-control"
                          name="last_name"
                        //   value={information.last_name}
                        //   onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Your birthday</label>
                        <input
                          type="date"
                          className="form-control"
                          name="birthday"
                        //   value={information.birthday}
                        //   onChange={handleBirthday}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>City</label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                        //   value={information.city}
                        //   onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>State</label>
                        <input
                          type="text"
                          className="form-control"
                          name="state"
                        //   value={information.state}
                        //   onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Line</label>
                        <input
                          type="text"
                          className="form-control"
                          name="line"
                        //   value={information.line}
                        //   onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Postal code</label>
                        <input
                          type="text"
                          className="form-control"
                          name="postal_code"
                        //   value={information.postal_code}
                        //   onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Tax ID</label>
                        <input
                          type="text"
                          className="form-control"
                          name="tax_id"
                        //   value={information.tax_id}
                        //   onChange={onChange}
                          maxLength="10"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mx-auto mt-3">
                      <div className="form-group">
                        <h6 className="text-center">Your avatar</h6>
                        <label htmlFor="avatar" >
                            {/* style={styleImg} */}
                          <img
                        //     src={
                        //     //   information.avatar
                        //     //     ? information.avatar
                        //     //     : avatarDefault
                        //   //  }
                        //     alt=""
                        //     height="200px"
                        //     width="200px"
                          />
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="avatar"
                          name="tax_id"
                        //   onChange={handleImage}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    {/* {isLoading ? (
                      <div
                        className="spinner-border text-primary pull-right"
                        role="status"
                      >
                        <span className="sr-only"> Loading... </span>{" "}
                      </div>
                    ) : (
                      <div className="col-sm-12">
                        <button
                          onClick={backPage}
                          className="btn btn-outline-dark mr-2"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="btn btn-dark pull-right mr-2"
                        >
                          Verify
                        </button>
                      </div>
                    )} */}
                  </div>

                  <div className="clearfix" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
            </div>
        )
    }
}
