import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { Select, Input, MenuItem, Checkbox, ListItemText, FormControl } from '@material-ui/core';
import '../Admin.css';
import * as Config from '../../../../connect/Config';

export class ManageProductAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtModel: '',
            txtPrice: '',
            txtDescription: '',
            txtIn_stock: '',
            txtVat: '',
            txtColor: '',
            txtTag: '',
            txtImage: '/assets/img/theme/productnull.png',
            imgValue: null,
            imgName: '',
            txtFull_description: 'abc',
            txtDowloads: 'abc',
            txtFaq: 'abc',
            txtSite: '',
            getCompany: [],
            companyId: '',
            storeName: '',
            txtProductGroup: '',
            getProductGroup: [],
            // allCompCategory: [],
            // compCategory: [],
            // // txtCategory: [],
            // txtCategory: '',
            // category: [],
            // txtCategory:'2',
            // txtCompany_id: '97'
            txtCategories: [],
            category: [],
            categories: [],
            categoryCompany: [],
            totalCategories: [],
            token: localStorage.getItem('token'),
            formErrors: {
                txtName: '',
                txtSite: '',
                txtModel: '',
                txtDescription:'',
                txtPrice: '',
                txtColor: '',
                txtTag: '',
                txtVat: '',
                txtIn_stock: ''
            }
        }
    }
    componentWillMount() {
        var { match } = this.props;
        if (match && match !== null) {
            var id = match.params.id;
            axios.get(`${Config.API_URL}/api/user/product/${id}`, {
                headers: { Authorization: `JWT ${this.state.token}` }
            }).then(res => {
                this.setState({
                    id: id,
                    txtName: res.data.name,
                    txtModel: res.data.model,
                    txtPrice: res.data.price,
                    txtDescription: res.data.description,
                    txtIn_stock: res.data.in_stock,
                    txtVat: res.data.vat,
                    txtColor: res.data.color,
                    txtTag: res.data.tag,

                    txtImage: res.data.image,

                    txtFull_description: res.data.full_description,
                    txtDowloads: res.data.downloads,
                    txtFaq: res.data.faq,

                    txtSite: res.data.site,
                    txtProductGroup: res.data.productgroup,
                    category: res.data.category
                })
                // console.log(res.data.image)
                var category = res.data.category
                var i = []
                category.map((category, index) => {
                    i.push(category.name)
                })
                this.setState({ txtCategories: i })
                // console.log(res.data.name,res.data.site, id)
                axios.get(`https://seekproduct-api.misavu.net/api/user/company/detail/${res.data.site}/`, {
                    headers: { Authorization: `JWT ${this.state.token}` }
                }).then(res => {
                    if (200 <= res.status < 400) {
                        this.setState({
                            categories: res.data.category,
                            companyId: res.data.id,
                            storeName: res.data.store_name
                        });
                        axios.get(`https://seekproduct-api.misavu.net/api/company/${res.data.id}/list-productgroup/`, {
                            headers: { Authorization: `JWT ${this.state.token}` }
                        }).then(res => {
                            this.setState({
                                getProductGroup: res.data
                            });
                        })
                        axios.get(`https://seekproduct-api.misavu.net/api/user/company/detail/${res.data.site}/`, {
                            headers: { Authorization: `JWT ${this.state.token}` }
                        }).then(res => {
                            this.setState({ categories: res.data.category });
                        })
                        // .catch(err => {
                        //     console.log(err);
                        // })
                        axios.get(`${Config.API_URL}/api/category`, {
                            headers: { Authorization: `JWT ${this.state.token}` }
                        }).then(res => {
                            this.setState({
                                totalCategories: res.data.results
                            });
                        })
                    }
                })
            }).catch((error) => {
                console.log(error);
            })
        }
        else {
            axios.get(`${Config.API_URL}/api/user/company/my-company/`, {
                headers: { Authorization: `JWT ${this.state.token}` }
            }).then(res => {
                // console.log(res.data.results);
                if (200 >= res.status < 400) {
                    this.setState({
                        getCompany: res.data.results
                    });
                }
            })
            // .catch(err => {
            //     console.log(err);
            // });
        }
    }
    onChangeProduct = (e) => {

        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case 'txtName':
                formErrors.txtName = value.length < 3 && value.length > 0 ?
                    'At least 3 characters. Please enter again'
                    : "";
                break;
            case 'txtSite':
                formErrors.txtSite = value.length < 3 && value.length > 0 ?
                    'At least 3 characters. Please enter again'
                    : "";
                break;
            case "txtModel":
                formErrors.txtModel =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case 'txtPrice':
                formErrors.txtPrice = value.length < 3 && value.length > 0 ?
                    'At least 3 characters. Please enter again'
                    : "";
                break;
            case 'txtColor':
                formErrors.txtColor = value.length < 3 && value.length > 0 ?
                    'At least 3 characters. Please enter again'
                    : "";
                break;
            case 'txtDescription':
                formErrors.txtDescription = value.length < 3 && value.length > 0 ?
                    'At least 3 characters. Please enter again'
                    : "";
                break;
            case 'txtTag':
                formErrors.txtTag = value.length < 3 && value.length > 0 ?
                    'At least 3 characters. Please enter again'
                    : "";
                break;
            case 'txtVAT':
                formErrors.txtVat = value.length < 3 && value.length > 0 ?
                    'At least 3 characters. Please enter again'
                    : "";
                break;
            case 'txtIn_stock':
                formErrors.txtIn_stock = value.length < 1 && value.length > 0 ?
                    'minimum 1 characater required'
                    : "";
                break;

        }
        this.setState({
            formErrors,
            [e.target.name]: e.target.value
        });
    }

    handleFile = (e) => {
        if (e.target.files && e.target.files[0]) {
            this.setState({
                [e.target.name]: URL.createObjectURL(e.target.files[0]),
                imgValue: e.target.files[0],
                imgName: e.target.files[0].name
            });
        }
    }

    onChangeSelect = (e) => {

        var { match } = this.props;
        if (!match) {
            var { value } = e.target
            var site = null
            this.state.getCompany.forEach(myCompany => {
                if (value == myCompany.id) {
                    site = myCompany.site
                }
            })
            // console.log(value,site)
            this.setState({
                companyId: value,
                txtSite: site
            })
            // console.log(site)
            axios.get(`${Config.API_URL}/api/company/${value}/list-productgroup/`, {
                headers: { Authorization: `JWT ${this.state.token}` }
            }).then(res => {
                // console.log(res.data);
                this.setState({ getProductGroup: res.data });
            })
            // .catch(err => {
            //     console.log(err);
            // })
            // console.log(site)
            axios.get(`${Config.API_URL}/api/user/company/detail/${site}/`, {
                headers: { Authorization: `JWT ${this.state.token}` }
            }).then(res => {
                // console.log(res.data.category);
                this.setState({ categories: res.data.category });
            })
            // .catch(err => {
            //     console.log(err);
            // })

            axios.get(`https://seekproduct-api.misavu.net/api/category`, {
                headers: { Authorization: `JWT ${this.state.token}` }
            }).then(res => {
                // console.log(res);
                this.setState({ totalCategories: res.data.results });
            })
            // .catch(err => {
            //     console.log(err);
            // })
        }
    }
    onSubmitProduct = (e) => {
        e.preventDefault();
        var { id, txtSite, category, totalCategories, txtCategories, imgValue, imgName, getProductGroup, txtProductGroup, txtName, txtModel, txtPrice, txtDescription, txtIn_stock, txtVat, txtColor, txtTag, txtFaq, txtFull_description, txtDowloads } = this.state;
        var { history } = this.props;

        var i = []
        txtCategories.forEach((category, index) => {
            totalCategories.forEach((totalCategory, index) => {
                if (category === totalCategory.name) {
                    i.push(totalCategory.id)
                }
            })
        })

        // console.log(this.state);
        if (txtSite !== null) {
            const formData = new FormData();
            formData.append('name', txtName)
            formData.append('model', txtModel)
            formData.append('price', txtPrice)
            formData.append('description', txtDescription)
            formData.append('in_stock', txtIn_stock)
            formData.append('vat', txtVat)
            formData.append('color', txtColor)
            formData.append('tag', txtTag)
            formData.append('full_description', txtFull_description)
            formData.append('downloads', txtDowloads)
            formData.append('faq', txtFaq)
            formData.append('productgroup', txtProductGroup)
            i.map((category, index) => {
                formData.append("category", category)
            })
            if (imgValue !== null) {
                formData.append("image", imgValue, imgName);
            }
            console.log(category)
            if (id) {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", `JWT ${localStorage.getItem('token')}`);

                var requestOptions = {
                    method: 'put',
                    headers: myHeaders,
                    body: formData,
                };
                fetch(`https://seekproduct-api.misavu.net/api/user/product/${id}`, requestOptions)
                .then(res => {
                    console.log(res)
                    if (res) {
                        swal({
                            title: "Update success",
                            icon: "success",
                        })
                        history.goBack()
                    }
                })
                .catch(error => {
                    console.log('error', error)
                    swal({
                        title: "Infomation success",
                        text: `${error}`,
                        icon: "error",
                        dangerMode: true,
                    })
                });
                // console.log(id);
                // axios.put(`${Config.API_URL}/api/user/product/${id}`, formData, {
                //     headers: { Authorization: `JWT ${this.state.token}` }
                // }).then(response => {
                //     console.log(response);
                //     swal("EDIT SUCCSESS!", "ADD SUCCSESS", "success");
                //     history.goBack();
                // })
                // .catch(function (error) {
                //     swal({
                //         title: "Failed action?",
                //         text: "Please try again",
                //         icon: "warning",
                //         buttons: true,
                //         dangerMode: true,
                //       })
                //     console.log(error.response);
                // })
                // console.log(formData);
            }
            else {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", `JWT ${localStorage.getItem('token')}`);

                var requestOptions = {
                    method: 'post',
                    headers: myHeaders,
                    body: formData,
                };
                fetch(`https://seekproduct-api.misavu.net/api/user/product/?site=${txtSite}`, requestOptions)
                .then(res => {
                    console.log(res)
                    if (res) {
                        swal({
                            title: "Update success",
                            icon: "success",
                        })
                        history.goBack()
                    }
                })
                .catch(error => {
                    console.log('error', error)
                    swal({
                        title: "Infomation success",
                        text: `${error}`,
                        icon: "error",
                        dangerMode: true,
                    })
                });
                // axios.post(`${Config.API_URL}/api/user/product/?site=${txtSite}`, formData, {
                //     headers: { Authorization: `JWT ${this.state.token}` }
                // }).then(response => {
                //     console.log(response);
                //     swal("ADD SUCCSESS!", "ADD SUCCSESS", "success");
                //     history.goBack();

                // })
                //     .catch(function (error) {
                //         swal({
                //             title: "Failed action?",
                //             text: "Please try again",
                //             icon: "warning",
                //             buttons: true,
                //             dangerMode: true,
                //         })

                //         console.log(error.response);
                //     })
            }
            console.log(txtProductGroup, category, txtName, imgValue)
        }
        else {
            swal("Failed action !", "You can click the button to exit", "warning");
        }
    }

    render() {
        var { txtImage, imgValue, txtCategories, totalCategories, categories, companyId, getCompany, storeName, getProductGroup, txtProductGroup, txtName, txtModel, txtPrice, txtDescription, txtIn_stock, txtVat, txtColor, txtTag, txtFaq, txtFull_description, txtDowloads } = this.state;
        const { formErrors } = this.state;
        var { match } = this.props;

        var SelectproGroup = null
        if (companyId !== "") {
            SelectproGroup = getProductGroup.map((SelectproGroup, index) => {
                return (
                    <option
                        key={index}
                        value={SelectproGroup.id}
                    >
                        {SelectproGroup.name} id:
                        {SelectproGroup.id}
                    </option>
                )
            })
        }

        var i = []
        categories.forEach((category, index) => {
            totalCategories.forEach((totalCategory, index) => {
                if (category === totalCategory.id) {
                    i.push(totalCategory.name)
                }
            })
        })

        var categoryAdd = null

        categoryAdd = i.map((name, index) => {
            return (
                <MenuItem key={index} value={name}>
                    <Checkbox checked={txtCategories.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                </MenuItem>
            )
        })
        var selectCompany = null
        if (match && match !== null) {
            selectCompany = <option>{storeName}</option>
        } else {
            // selectOption = (<option>--- Please select your company ---</option>)
            selectCompany = getCompany.map((myCompany, index) => {
                return (
                    <option
                        key={index}
                        value={myCompany.id}
                    >
                        {myCompany.store_name}
                    </option>
                )
            });
            // return selectOption.push(i)
        }
        return (
            <form className="mt-2 n-form-admin" onSubmit={this.onSubmitProduct} encType="multipart/form-data">
                <div className="row col">
                    <div className="form-group col-6">
                        <label>Select Company:</label>

                        <select className="form-control" name="txtSite" onChange={this.onChangeSelect}>
                            {selectCompany}
                            <option></option>
                        </select>
                    </div>
                    <div className="form-group col-6">
                        <label>Product Group:</label>

                        <select className="form-control" name="txtProductGroup" value={this.state.txtProductGroup} onChange={this.onChangeProduct}>
                            <option></option>
                            {SelectproGroup}
                        </select>
                    </div>

                </div>
                <div className="row col">
                    <div className="form-group col-9">
                        <label>Change Category:</label><br />
                        <FormControl >
                            <Select
                                className="n-select-action"
                                displayEmpty={true}
                                multiple
                                name="txtCategories"
                                value={txtCategories}
                                onChange={this.onChangeProduct}
                                input={<Input />}
                                renderValue={(selected) => selected.join(', ')}
                            // MenuProps={MenuProps}
                            >
                                {categoryAdd}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="form-group col-3">
                        <Link to="/admin/productgroup/add" className="btn btn-success col-12 mt-3">Add PRODUCT GROUP</Link>
                    </div>
                </div>
                <div className="row col">
                    <div className="form-group col-6">
                        <label>Name:</label>
                        <input type="text" className="form-control" name="txtName"
                            placeholder="Product name"
                            value={txtName}
                            onChange={this.onChangeProduct} 
                            required
                            />
                        {formErrors.txtName.length > 0 && (
                            <span className="errorMessage">{formErrors.txtName}</span>
                        )}
                    </div>
                    <div className="form-group col-6">
                        <label>Price:</label>
                        <input type="number" className="form-control" name="txtPrice"
                            min="0"
                            value={txtPrice}
                            onChange={this.onChangeProduct} 
                            required
                            />
                        {/* {formErrors.txtPrice.length > 0 && (
                                <span className="errorMessage">{formErrors.txtPrice}</span>
                            )} */}
                    </div>
                    <div className="form-group col-6">
                        <label>Vat:</label>
                        <input type="number" className="form-control" name="txtVat"
                            min="0"
                            value={txtVat}
                            onChange={this.onChangeProduct} />
                        {/* {formErrors.txtVat.length > 0 && (
                                <span className="errorMessage">{formErrors.txtVat}</span>
                            )} */}
                    </div>
                    <div className="form-group col-6">
                        <label>Color:</label>
                        {/* <input type="text" className="form-control" name="txtColor"
                            value={txtColor}
                            onChange={this.onChangeProduct} />
                            {formErrors.txtColor.length > 0 && (
                                <span className="errorMessage">{formErrors.txtColor}</span>
                            )} */}
                        <select
                            name="txtColor"
                            className="form-control"
                            value={txtColor}
                            onChange={this.onChangeProduct}
                        >
                            <option value="Blue" className="bg-primary text-white">blue</option>
                            <option value="Black" className="bg-dark text-white">Black</option>
                            <option value="Green" className="bg-success text-white">Green</option>
                            <option value="Red" className="bg-danger text-white">Red</option>
                            <option value="White" className="bg-secondary">White</option>
                            <option value="Oranges" className="bg-warning text-white">Oranges</option>
                        </select>
                    </div>
                </div>
                <div className="row col">
                    <div className="form-group col-6">
                        <label>In_stock:</label>
                        <input type="number" className="form-control" name="txtIn_stock"
                            min="0"
                            value={txtIn_stock}
                            onChange={this.onChangeProduct} />
                        {/* {formErrors.txtIn_stock.length > 0 && (
                                <span className="errorMessage">{formErrors.txtIn_stock}</span>
                            )} */}
                    </div>
                    <div className="form-group col-6">
                        <label>Tag:</label>
                        <input type="text" className="form-control" name="txtTag"
                            value={txtTag}
                            onChange={this.onChangeProduct} 
                            required
                            />
                        {formErrors.txtTag.length > 0 && (
                            <span className="errorMessage">{formErrors.txtTag}</span>
                        )}
                    </div>
                </div>
                <div className="col">
                    <div className="form-group col-12">
                        <label>Model:</label>
                        <input type="text" className="form-control" name="txtModel"
                            placeholder="Product Model"
                            value={txtModel}
                            onChange={this.onChangeProduct}
                            required 
                            />
                        {formErrors.txtModel.length > 0 && (
                            <span className="errorMessage">{formErrors.txtModel}</span>
                        )}
                    </div>

                    <div className="form-group col-12">
                        <label>Description:</label>
                        <input type="text" className="form-control" name="txtDescription"
                            placeholder="Product Description"
                            value={txtDescription}
                            onChange={this.onChangeProduct} 
                            required 
                            />
                        {formErrors.txtDescription.length > 0 && (
                            <span className="errorMessage">{formErrors.txtDescription}</span>
                        )}
                    </div>
                </div>
                <div className="col">
                    <div className="form-group col-5">
                        <label className="mr-5">Image:</label>
                        <label htmlFor="file-img" className="btn btn-icon btn-success"><i className="fa fa-picture-o" aria-hidden="true"></i> Chose Image</label>
                        <img id="target" src={txtImage} className="n-input-file-img" />
                        <input type="file" className="form-control n-input-file" id="file-img" name="txtImage" accept="image/jpg, image/png"
                            onChange={this.handleFile} />
                    </div>
                </div>

                <div className="col">
                    <div className="form-group col-12">
                        <label>Full_description:</label>
                        <textarea type="text" className="form-control" name="txtFull_description"
                            value={txtFull_description}
                            onChange={this.onChangeProduct} />
                    </div>
                    <div className="form-group col-12">
                        <label>Faq:</label>
                        <textarea type="text" className="form-control" name="txtFaq"
                            value={txtFaq}
                            onChange={this.onChangeProduct} 
                            required
                            />
                    </div>
                    <div className="form-group col-12">
                        <label>Dowloads:</label>
                        <textarea type="text" className="form-control" name="txtDownloads"
                            value={txtDowloads}
                            onChange={this.onChangeProduct} 
                            required
                            />
                    </div>
                </div>
                <div className="row col-4">
                    <button type="submit" className="btn btn-primary col-5">Save</button>
                    <Link to="/admin/product" type="button" className="btn btn-outline-primary col-6">Come back</Link>
                </div>

            </form>
        )
    }
}

export default ManageProductAction
