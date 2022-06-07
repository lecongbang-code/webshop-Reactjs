import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import swal from 'sweetalert';
import callApi from '../../../connect/API-caller'
import { Select, Input, MenuItem, Checkbox, ListItemText, FormControl } from '@material-ui/core';

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};


export class ManageCompanyAction extends Component {


    constructor(props) {
        super(props);
        this.state= {
          
          store_name: '',
          address: '',
          phone_number: '',
          site: '',
          legal_name:'',
          business_license:'',
          about: '',
          token: localStorage.getItem('token'), 
          wanting: { err_store: '', err_phone:'', err_address:'', err_site:'', err_business:'', err_about:'', err_category:'' },
          category: [],
          categories: [],
          fileLogo: 'https://2.bp.blogspot.com/-N4zonTLfbfA/Wyl80EdQUkI/AAAAAAABkvM/we1wR_xJdXkM9T5BP03tx4vo1npaUkT6ACLcBGAs/s550/new-lille-osc-logo-2.jpg',
          logoValue: null,
          logoName: '',
          formErrors: {
            store_name: "",
           site: "",
           phone_number: "",
           legal_name: "",
           business_license: "",
           address: "",
           
        },
        errr: ""
        }
    }

    // ____________________Bat loi ___________________



    validate = () => {
        let err_store = "";
        let err_phone = '';
        let err_address = '';
        let err_site = '';
        let err_about = '';
        let err_category = ''

       
    }




    // _____________________________________








    onSave = (e) => {


        var { history } = this.props
        var { store_name, address, phone_number, legal_name, site, business_license, about, category, logoName, logoValue, categories } = this.state;
        e.preventDefault(); console.log(this.state)
        let URL = 'http://172.104.50.113:886';
        // console.log(category);

        var i = []
        category.forEach((category, index) => {
            categories.forEach((categories, index) => {
                if (category === categories.name) {
                    i.push(categories.id)
                }
            })
        })

        const formData = new FormData();
        formData.append('store_name', store_name)
        formData.append('address', address)
        formData.append('phone_number', phone_number)
        formData.append('legal_name', legal_name)
        formData.append('business_license', parseInt(business_license))
        formData.append('site', site)
        formData.append('about', about)
        if (logoValue !== null) {
            formData.append("logo", logoValue, logoName);
        }
        i.map((category, index) => {
            formData.append("category", category)
        })

        // if(category){
        //   for(let i =  0; i< category.length; i++){
        //     formData.append('category', category)
        //   }
        // }
        if (site) {
            var myHeaders = new Headers();
                myHeaders.append("Authorization", `JWT ${localStorage.getItem('token')}`);
            const requestOptions = {
                method: 'put',
                headers: myHeaders,
                body: formData
            };
            fetch( `https://seekproduct-api.misavu.net/api/user/company/detail/${site}/`, requestOptions)
            .then(response => 
                {
                    console.log(response)
                    if ((response.status >= 200) && (response.status <= 201)) {
                        swal("EDIT SUCCESS!", "You clicked the button!", "success");
                        history.goBack();
                    }
                }
            )
            .catch(function (error) {
                console.log(error);
                swal({
                    title: "Infomation success",
                    text: `${error}`,
                    icon: "error",
                    dangerMode: true,
                })
            })

        }
      
            var myHeaders = new Headers();
                myHeaders.append("Authorization", `JWT ${localStorage.getItem('token')}`);
            const requestOptions = {
                method: 'post',
                headers: myHeaders,
                body: formData
            };
            fetch( `https://seekproduct-api.misavu.net/api/user/company/`, requestOptions)
            .then(response => 
                {
                    console.log(response)
                    if ((response.status >= 200) && (response.status <= 201)) {
                        swal("ADD SUCCESS!", "You clicked the button!", "success");
                        history.push("/admin");
                    }
                    
                }
            )
            .catch(function (error) {
                console.log(error);
                swal({
                    title: "Infomation success",
                    text: `${error}`,
                    icon: "error",
                    dangerMode: true,
                })
            })
        }
        
        
    


    onChange = (e) => {
        var target = e.target;

        var name = target.name;
        var value = target.value
        this.setState({
            [name]: e.target.value
        });
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'store_name':
                formErrors.store_name = value.length < 4 && value.length > 0?
                    'minimum 4 characater required'
                    : "" ;
                break;
            case 'site':
                formErrors.site = value.length < 3 && value.length > 0 ?
                    'minimum 3 characater required'
                    : "";
                break;
            case "phone_number":
                formErrors.phone_number =
                    value.match(/^\d{10}$/) ? "" : "number is not valid";
                break;
            case 'legal_name':
                formErrors.legal_name = value.length < 3 && value.length > 0 ?
                    'minimum 3 characater required'
                    : "";
                break;
            case 'business_license':
                formErrors.business_license = value.length < 3 && value.length > 0 ?
                    'minimum 10 characater required'
                    : "";
                break;
            case 'address':
                formErrors.address = value.length < 10 && value.length > 0 ?
                    'minimum 10 characater required'
                    : "";
                break;
            
        }
        this.setState({ formErrors, [name]: value });
    };
    sr=()=>{
     return <span>haaa</span>
}
        
componentWillMount() {
        var {match} = this.props; 
      
        
           if(match!= null){
            console.log(match)
            var site = match.params.site;
            callApi(`/api/user/company/detail/${site}`, 'GET', null, { Authorization: `JWT ${this.state.token}` }).then(res => {
                var data = res.data;
                this.setState({

                    store_name: data.store_name,
                    address: data.address,
                    phone_number: data.phone_number,
                    legal_name: data.legal_name,
                    site: data.site,
                    business_license: data.business_license,
                    about: data.about,
                    category: data.category,
                    fileLogo: data.logo


                });
                var category = data.category

                callApi('/api/category', 'get', null, {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }).then(res => {
                    if (200 >= res.status < 400) {
                        this.setState({
                            categories: res.data.results
                        });


                        var i = []
                        category.forEach((category, index) => {
                            res.data.results.forEach((categories, index) => {
                                if (category === categories.id) {
                                    i.push(categories.name)
                                }
                            })
                        })
                        this.setState({
                            category: i
                        })

                    }
                })

            })
        } else {
            callApi('/api/category', 'get', null, {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }).then(res => {
                if (200 >= res.status < 400) {
                    this.setState({
                        categories: res.data.results
                    });

                }
                //   ............................................
            });
        }

    }


    onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            this.setState({
                [event.target.name]: URL.createObjectURL(event.target.files[0]),
                logoValue: event.target.files[0],
                logoName: event.target.files[0].name
            });
        }
    }




    render() {
      const { formErrors } = this.state;
      var {store_name, address, phone_number,legal_name, site, business_license, about, category, categories } = this.state
    //   console.log(categories)
     var categoryAdd = null
    categoryAdd = categories.map((categories, index) => {
        return (
            <MenuItem key={index} value={categories.name}>
                <Checkbox checked={category.indexOf(categories.name) > -1} />
                <ListItemText primary={categories.name} />
            </MenuItem>
        )
    })
     
        return (
            <form className="mt-2 n-form-admin" onSubmit={this.onSave}>
                <div className="row col">

                    <div className="form-group col-6">
                        <label>STORE_NAME:</label>
                        <input type="text" className="form-control" name='store_name' placeholder="This's the name of the company" minLength="4" required value={store_name} onChange={this.onChange} />

                        {formErrors.store_name.length > 4 && (<span className="errorMessage">{formErrors.store_name}</span>)}
                        {/* {formErrors.store_name.length == 0 && (<span className="errorMessage">{formErrors.store_name}</span>)}  */}

                    </div>
                    <div className="form-group col-6">
                        <label>ADDRESS:</label>
                        <input type="text" className="form-control" name='address' placeholder="This's the address of the company" minLength="5" required value={address} onChange={this.onChange} />

                        {formErrors.address.length > 0 && (<span className="errorMessage">{formErrors.address}</span>) }

                    </div>
                    <div className="form-group col-6">
                        <label>PHONE_NUMBER:</label>
                     
                        <input type="text" className="form-control" name='phone_number' placeholder="this's phone number for company or user" required minLength="10" value={phone_number} onChange={this.onChange} />
                        {formErrors.phone_number.length > 0 && (<span className="errorMessage">{formErrors.phone_number}</span>)}
                    </div>
                 
                </div>
                <div className="row col">
                <div className="form-group col-6">
                    <label>LEGAL_NAME:</label>
                    <input type="text" className="form-control"  name='legal_name'  placeholder="this'is legal name for company" required minLength="3" value={legal_name} onChange={this.onChange}/>
                    {formErrors.legal_name.length < 0 && (<span className="errorMessage">{formErrors.legal_name}</span>)}
                </div>
                <div className="form-group col-6">
                    <label>SITE:</label>
                    <input type="text" className="form-control" name='site' placeholder="this'is legal name for company" value={site} minLength="3" required onChange={this.onChange}/>
                    {formErrors.site.length > 0 && (<span className="errorMessage">{formErrors.site}</span>)}
                </div>
                <div className="form-group col-6">
                    <label>BUSINESS_LICENSE:</label>
                    <input type="text" className="form-control" name='business_license' placeholder="this'is legal name for company" required minLength="5" value={business_license} onChange={this.onChange}/>
                    {formErrors.business_license.length > 0 && (<span className="errorMessage">{formErrors.business_license}</span>)}
                </div>
                <div className="form-group col-6">
                    <label>ABOUT:</label>
                    <input type="text" className="form-control" name='about' required minLength="5" placeholder="about"onChange={this.onChange} value={about} />
                
                </div>
                <div className="form-group col-6">
                    <label>CATEGORY:</label>
                    {/* <input type="number" className="form-control" name='category' placeholder="this's category for products" onChange={this.onChange} value={category} /> */}
                    <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>Categories</label>
                                                    <FormControl >
                                                        <Select                                                    
                                                            displayEmpty={true}
                                                            multiple
                                                            name="category"
                                                            value={category}
                                                            onChange={this.onChange}
                                                            input={<Input />}
                                                            renderValue={(selected) => selected.join(', ')}
                                                          >   
                                                            {categoryAdd}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </div>
             
             
           

                {/* <div className="col-lg-6 image-upload">
                                            <div className="form-group">
                                                <h3>Logo</h3>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="logoImage"
                                                >
                                                    <img id="target" src={this.state.fileLogo}   width={200} height={150} />
                                                </label>
                                                <input _ngcontent-c23=""
                                                    accept="image/*"
                                                    className="accent"
                                                    id="logoImage"
                                                    name="fileLogo"
                                                    // required
                                                    type="file"
                                                    onChange={this.onImageChange}
                                                    
                                                />
                                            </div>
                                        </div>
                                   
               
                </div> */}
                <div className="col">
                    <div className="form-group col-5">
                        <label className="mr-5">Image:</label>
                        <label htmlFor="logoImage" className="btn btn-icon btn-success"><i className="fa fa-picture-o" aria-hidden="true"></i> Chose Image</label>
                        <img id="target" src={this.state.fileLogo} className="n-input-file-img" />
                        <input type="file" className="form-control n-input-file" id="logoImage" name="fileLogo" accept="image/jpg, image/png"
                            onChange={this.onImageChange} />
                    </div>
                </div>
                </div>
                <button type="submit" className="btn btn-outline-primary">Save</button>
                <Link to="/admin/company" type="button" className="btn btn-outline-default">Come back</Link>
            </form>
        )
    }
}

export default ManageCompanyAction
