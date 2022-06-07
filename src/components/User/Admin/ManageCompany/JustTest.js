// import React, { Component } from 'react';

// // import './CompanyActionPage.css';
// import { Link } from 'react-router-dom';
// import swal from 'sweetalert';
// import { Select, Input, MenuItem, Checkbox, ListItemText, FormControl } from '@material-ui/core';
// import callApi from '../../../../connect/API-caller';

// const formValid = ({ formErrors, ...rest }) => {
//     let valid = true;

//     // validate form errors being empty
//     Object.values(formErrors).forEach(val => {
//         val.length > 0 && (valid = false);
//     });

//     // validate the form was filled out
//     Object.values(rest).forEach(val => {
//         val === null && (valid = false);
//     });

//     return valid;
// };


// export class ABC extends Component {
//     constructor(props) {
//         super(props);
//         var { match } = this.props;
//         this.state = {
//             match,
//             id: '',
//             txtNameStore: '',
//             txtSite: '',
//             txtAddress: '',
//             category: [],
//             categories: [],
//             // socialLink: [],
//             txtCategories: [],
//             txtPhone: '',
//             txtLicense: '',
//             txtLegal: '',
//             // fileBanner: '../assets/img/banner/b5.png',
//             fileLogo: '../assets/img/banner/logo.jpg',
//             txtAbout: '',
//             logoValue: null,
//             logoName: '',
//             formErrors: {
//                 txtNameStore: "",
//                 txtSite: "",
//                 txtPhone: "",
//                 txtLegal: "",
//                 txtLicense: "",
//                 txtAddress: ""
//             }
//         };
//     }

//     componentWillMount() {
//         var { match } = this.state
//         if (match.path === '/company/:id/edit') {
//             var site = match.params.id;
//             callApi(`/api/user/company/detail/${site}/`, 'GET', null, {
//                 Authorization: `JWT ${localStorage.getItem('token')}`
//             }).then(res => {
//                 var data = res.data

//                 this.setState({
//                     txtAddress: data.address,
//                     txtNameStore: data.store_name,
//                     txtSite: data.site,
//                     txtAddress: data.address, 
//                     txtPhone: data.phone_number,
//                     txtLicense: data.license_name,
//                     txtSite: data.site,
//                     txtLegal: data.legal_name,
//                     txtAbout: data.about_me,
//                     // category: data.category,
//                     txtLicense: data.business_license,
//                     category: data.category,
//                     txtAbout: data.about,
//                     fileLogo: data.logo
//                     // imgName: '',
//                 })
//                 var category = data.category

//                 callApi('/api/category', 'get', null, {
//                     Authorization: `JWT ${localStorage.getItem('token')}`
//                 }).then(res => {
//                     if (200 >= res.status < 400) {
//                         this.setState({
//                             categories: res.data.results
//                         });

        
//                         var i = []
//                         category.forEach((category, index) => {
//                             res.data.results.forEach((categories, index) => {
//                                 if (category === categories.id) {
//                                     i.push(categories.name)
//                                 }
//                             })
//                         })
//                         this.setState({
//                             txtCategories: i
//                         })
        
//                     }
//                 })

//             })
//         }else{
//             callApi('/api/category', 'get', null, {
//                 Authorization: `JWT ${localStorage.getItem('token')}`
//             }).then(res => {
//                 if (200 >= res.status < 400) {
//                     this.setState({
//                         categories: res.data.results
//                     });

//                 }
//             })
//         }
//     }   

//     onChange = (e) => {
//         const { name, value } = e.target;
//         this.setState({
//             [name]: value
//         });
//         let formErrors = this.state.formErrors;

//         switch (name) {
//             case 'txtNameStore':
//                 formErrors.txtNameStore = value.length < 3 && value.length > 0 ?
//                     'minimum 3 characater required'
//                     : "";
//                 break;
//             case 'txtSite':
//                 formErrors.txtSite = value.length < 3 && value.length > 0 ?
//                     'minimum 3 characater required'
//                     : "";
//                 break;
//             case "txtPhone":
//                 formErrors.txtPhone =
//                     value.length < 10 ? "minimum 10 characaters required" : "";
//                 break;
//             case 'txtLegal':
//                 formErrors.txtLegal = value.length < 3 && value.length > 0 ?
//                     'minimum 3 characater required'
//                     : "";
//                 break;
//             case 'txtLicense':
//                 formErrors.txtLicense = value.length < 3 && value.length > 0 ?
//                     'minimum 3 characater required'
//                     : "";
//                 break;
//             case 'txtAddress':
//                 formErrors.txtAddress = value.length < 10 && value.length > 0 ?
//                     'minimum 10 characater required'
//                     : "";
//                 break;

//         }
//         this.setState({ formErrors, [name]: value });
//     };

//     onImageChange = (event) => {
//         if (event.target.files && event.target.files[0]) {
//             this.setState({
//                 [event.target.name]: URL.createObjectURL(event.target.files[0]),
//                 logoValue: event.target.files[0],
//                 logoName: event.target.files[0].name
//             });
//         }
//     }

//     onSave = (e) => {
//         e.preventDefault();
//         console.log(this.state)

//         var { history } = this.props
//         var { match,txtCategories, categories, txtSite, logoValue, logoName, txtNameStore, txtAddress, txtPhone, txtLicense, txtLegal, fileLogo, filterCategories, txtAbout } = this.state;

//         var i = []
//         txtCategories.forEach((category, index) => {
//             categories.forEach((categories, index) => {
//                 if (category === categories.name) {
//                     i.push(categories.id)
//                 }
//             })
//         })

//         var formData = new FormData();
//         formData.append("address", txtAddress)
//         formData.append("site", txtSite)
//         formData.append("phone_number", txtPhone)
//         formData.append("business_license", txtLicense)
//         formData.append("legal_name", txtLegal)
//         formData.append("store_name", txtNameStore)
//         formData.append("about", txtAbout)

//         i.map((category, index) => {
//             formData.append("category", category)
//         })

//         if (logoValue !== null) {
//             formData.append("logo", logoValue, logoName);
//         }

//         if (match.path === '/company/:id/edit') {

//             callApi(`/api/user/company/detail/${match.params.id}/`, 'put', formData, {
//                 Authorization: `JWT ${localStorage.getItem('token')}`
//             }).then(res => {
//                 console.log(res)
//                 if(200<=res.status<400){
//                     swal({
//                         title: "Infomation Updated",
//                         icon: "success",
//                         dangerMode: false,
//                     })
//                     history.goBack()
//                 }
//             })
//         } else {
//             callApi('/api/user/company/', 'post', formData, {
//                 Authorization: `JWT ${localStorage.getItem('token')}`
//             }).then(res => {
//                 console.log(res)
//                 if(200<=res.status<400){
//                     swal({
//                         title: "Add companu success",
//                         icon: "success",
//                     })
//                     history.goBack()
//                 }
//             })
//         }
//     }

//     render() {
//         var { site } = this.state;
//         const { formErrors } = this.state;

//         var { category, txtCategories, categories, txtNameStore, txtSite, txtAddress, txtPhone, txtLicense, txtLegal, fileLogo, filterCategories, txtAbout } = this.state;

//         // var myCompany = myCompanies.map((myCompany, index) => { 
//         //     return(
//         //         <option key={index} value={myCompany.id}>{myCompany.store_name}</option>
//         //     )
//         // });

//         // var category = category.map( (category, index) =>{
//         //     return(
//         //         <option key={index} value={category.id}>{category.name}</option>
//         //     );
//         // })

//         // var i = []
//         // categories.forEach((category, index) => {
//         //     totalCategories.forEach((totalCategory, index) => {
//         //         if (category === totalCategory.id) {
//         //             i.push(totalCategory.name)
//         //         }
//         //     })
//         // })

//         var categoryAdd = null

//         categoryAdd = categories.map((categories, index) => {
//             return (
//                 <MenuItem key={index} value={categories.name}>
//                     <Checkbox checked={txtCategories.indexOf(categories.name) > -1} />
//                     <ListItemText primary={categories.name} />
//                 </MenuItem>
//             )
//         })


//         return (
//             <div>
//                 <div className="container-fluid mt--10">
//                     <div className="row">
//                         {/* <div className="col-xl-4 order-xl-2"></div> */}
//                         {/* <div className="col-xl-8 order-xl-1"> */}
//                         <div className="card">
//                             <div className="card-header">
//                                 <div className="row align-items-center">
//                                     <div className="col-8">
//                                         <h3 className="mb-0">My Companies</h3>
//                                         <small _ngcontent-c13="">
//                                             <Link to="/company" className="fa fa-arrow-circle-o-left">
//                                                 Back to list
//                                             </Link>
//                                         </small>
//                                     </div>

//                                     <div className="col-4 text-right">
//                                         <button
//                                             type="submit"
//                                             className="btn btn-info add"
//                                             onClick={this.onSave}
//                                         >Save
//                                         </button>

//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="card-body">
//                                 <form onSubmit={this.onSave}>
//                                     <h6 className="heading-small text-muted mb-4">
//                                         Add a new company
//                                     </h6>
//                                     <div className="pl-lg-4">
//                                         <div className="row">
//                                             <div className="col-lg-6">
//                                                 <div className="form-group">
//                                                     <label
//                                                         className="form-control-label"
//                                                         htmlFor="input-namestore"
//                                                     >
//                                                         Store Name
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         id="input-namestore"
//                                                         className="form-control"
//                                                         // {formErrors.txtNameStore.length > 0 ? "error" : null}
//                                                         placeholder="Store Name"
//                                                         name="txtNameStore"
//                                                         value={txtNameStore}
//                                                         onChange={this.onChange}
//                                                     />
//                                                     {formErrors.txtNameStore.length > 0 && (
//                                                         <span className="errorMessage">{formErrors.txtNameStore}</span>
//                                                     )}
//                                                 </div>
//                                             </div>

//                                             <div className="col-lg-6">
//                                                 <div className="form-group">
//                                                     <label
//                                                         className="form-control-label"
//                                                         htmlFor="input-site"
//                                                     >
//                                                         Site
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         id="input-namestore"
//                                                         className="form-control"
//                                                         placeholder="Site"
//                                                         name="txtSite"
//                                                         value={txtSite}
//                                                         onChange={this.onChange}
//                                                     // readonly
//                                                     />
//                                                     {formErrors.txtNameStore.length > 0 && (
//                                                         <span className="errorMessage">{formErrors.txtNameStore}</span>
//                                                     )}
//                                                 </div>
//                                             </div>

//                                             <div className="col-lg-6">
//                                                 <div className="form-group">
//                                                     <label
//                                                         className="form-control-label"
//                                                         htmlFor="input-phone"
//                                                     >
//                                                         Phone Number
//                                                     </label>
//                                                     <input
//                                                         type="number"
//                                                         id="input-phone"
//                                                         className="form-control"
//                                                         placeholder="Phone Number"
//                                                         name="txtPhone"
//                                                         value={txtPhone}
//                                                         onChange={this.onChange}
//                                                     />
//                                                     {formErrors.txtPhone.length > 0 && (
//                                                         <span className="errorMessage">{formErrors.txtPhone}</span>
//                                                     )}
//                                                 </div>
//                                             </div>

//                                             <div className="col-lg-6">
//                                                 <div className="form-group">
//                                                     <label
//                                                         className="form-control-label"
//                                                         htmlFor="input-license"
//                                                     >
//                                                         Business License
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         id="input-license"
//                                                         className="form-control"
//                                                         placeholder="Business License"
//                                                         name="txtLicense"
//                                                         value={txtLicense}
//                                                         onChange={this.onChange}
//                                                     />
//                                                     {formErrors.txtLicense.length > 0 && (
//                                                         <span className="errorMessage">{formErrors.txtLicense}</span>
//                                                     )}
//                                                 </div>
//                                             </div>

//                                             <div className="col-lg-6">
//                                                 <div className="form-group">
//                                                     <label
//                                                         className="form-control-label"
//                                                         htmlFor="input-legal"
//                                                     >
//                                                         Legal Name
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         id="input-legal"
//                                                         className="form-control"
//                                                         placeholder="Legal Name"
//                                                         name="txtLegal"
//                                                         value={txtLegal}
//                                                         onChange={this.onChange}
//                                                     />
//                                                     {formErrors.txtLegal.length > 0 && (
//                                                         <span className="errorMessage">{formErrors.txtLegal}</span>
//                                                     )}
//                                                 </div>
//                                             </div>

//                                             <div className="col-lg-6">
//                                                 <div className="form-group">
//                                                     <label
//                                                         className="form-control-label"
//                                                         htmlFor="input-address"
//                                                     >
//                                                         Address
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         id="input-address"
//                                                         className="form-control"
//                                                         placeholder="Address"
//                                                         name="txtAddress"
//                                                         value={txtAddress}
//                                                         onChange={this.onChange}
//                                                     />
//                                                     {formErrors.txtAddress.length > 0 && (
//                                                         <span className="errorMessage">{formErrors.txtAddress}</span>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                             <div className="col-lg-6">
//                                                 <div className="form-group">
//                                                     <label>Categories</label>
//                                                     <FormControl >
//                                                         <Select
//                                                             displayEmpty={true}
//                                                             multiple
//                                                             name="txtCategories"
//                                                             value={txtCategories}
//                                                             onChange={this.onChange}
//                                                             input={<Input />}
//                                                             renderValue={(selected) => selected.join(', ')}
//                                                         >
//                                                             {categoryAdd}
//                                                         </Select>
//                                                     </FormControl>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="col-lg-6 image-upload">
//                                             <div className="form-group">
//                                                 <h3>Logo</h3>
//                                                 <label
//                                                     className="form-control-label"
//                                                     htmlFor="logoImage"
//                                                 >
//                                                     <img id="target" src={this.state.fileLogo} width={200} height={150} />
//                                                 </label>
//                                                 <input _ngcontent-c23=""
//                                                     accept="image/*"
//                                                     className="accent"
//                                                     id="logoImage"
//                                                     name="fileLogo"
//                                                     required
//                                                     type="file"
//                                                     onChange={this.onImageChange}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="pl-lg-4">
//                                         <div className="form-group">
//                                             <label className="form-control-label">About Me</label>
//                                             <textarea
//                                                 rows={4}
//                                                 className="form-control"
//                                                 placeholder="A few words about you ..."
//                                                 name="txtAbout"
//                                                 value={txtAbout}
//                                                 onChange={this.onChange}
//                                             />
//                                         </div>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default ABC