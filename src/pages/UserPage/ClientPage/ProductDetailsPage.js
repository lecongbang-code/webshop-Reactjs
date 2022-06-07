import React, { Component } from 'react'
import ProductInfo from '../../../components/User/Client/product/ProductInfo';
import NavbarUser from './../../../components/User/Client/NavbarUser';
import Footer from '../../../components/User/Client/footer/Footer';
import callApi from './../../../connect/API-caller';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

export class ProductDetailsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: [],
            company: [],
            review: [],
            profile: [],
            rating: '',
            content: '',
            classname1: "fa fa-star-o",
            classname2: "fa fa-star-o",
            classname3: "fa fa-star-o",
            classname4: "fa fa-star-o",
            classname5: "fa fa-star-o"
        };
    }

    onClick = (name) => {
        var { rating, classname1, classname2, classname3, classname4, classname5 } = this.state;
        rating = name;
        this.setState({
            rating: name
        });
        //console.log(rating);
        if (name > 0 && name <= 1) {
            if (classname1 === "fa fa-star-o") {
                this.setState({
                    classname1: "fa fa-star"
                });
            } else {
                this.setState({
                    classname1: "fa fa-star",
                    classname2: "fa fa-star-o",
                    classname3: "fa fa-star-o",
                    classname4: "fa fa-star-o",
                    classname5: "fa fa-star-o",
                });
            }
        } else if (name > 1 && name <= 2) {
            if (classname2 === "fa fa-star-o") {
                this.setState({
                    classname1: "fa fa-star",
                    classname2: "fa fa-star"
                });
            } else {
                this.setState({
                    classname1: "fa fa-star",
                    classname2: "fa fa-star",
                    classname3: "fa fa-star-o",
                    classname4: "fa fa-star-o",
                    classname5: "fa fa-star-o",
                });
            }
        } else if (name > 2 && name <= 3) {
            if (classname3 === "fa fa-star-o") {
                this.setState({
                    classname1: "fa fa-star",
                    classname2: "fa fa-star",
                    classname3: "fa fa-star"
                });
            } else {
                this.setState({
                    classname1: "fa fa-star",
                    classname2: "fa fa-star",
                    classname3: "fa fa-star",
                    classname4: "fa fa-star-o",
                    classname5: "fa fa-star-o",
                });
            }
        } else if (name > 3 && name <= 4) {
            if (classname4 === "fa fa-star-o") {
                this.setState({
                    classname1: "fa fa-star",
                    classname2: "fa fa-star",
                    classname3: "fa fa-star",
                    classname4: "fa fa-star"
                });
            } else {
                this.setState({
                    classname1: "fa fa-star",
                    classname2: "fa fa-star",
                    classname3: "fa fa-star",
                    classname4: "fa fa-star",
                    classname5: "fa fa-star-o",
                });
            }
        } else if (name > 4 && name <= 5) {
            if (classname5 === "fa fa-star-o") {
                this.setState({
                    classname1: "fa fa-star",
                    classname2: "fa fa-star",
                    classname3: "fa fa-star",
                    classname4: "fa fa-star",
                    classname5: "fa fa-star"
                });
            } else {
                this.setState({
                    classname1: "fa fa-star",
                    classname2: "fa fa-star",
                    classname3: "fa fa-star",
                    classname4: "fa fa-star",
                    classname5: "fa fa-star",
                });
            }
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        var { profile, content, rating, product } = this.state;
        if (content === '' || rating === '') {
            swal({
                title: "Error",
                text: "You need to fill out the information",
                icon: "warning",
                dangerMode: true,
            })
        } else {
            const formData = new FormData();
            formData.append('name', profile.last_name)
            formData.append('email', profile.email)
            formData.append('rating', rating)
            formData.append('content', content)
            formData.append('product', product.id)
            callApi('/api/user/review/create', 'POST', formData, {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }).then(res => {
                if (res) {
                    swal("Good job!", "REVIEW SUCCSESS", "success");
                    this.setState({
                        rating: '',
                        value:'',
                        classname1: "fa fa-star-o",
                        classname2: "fa fa-star-o",
                        classname3: "fa fa-star-o",
                        classname4: "fa fa-star-o",
                        classname5: "fa fa-star-o"
                    });
                    var { match } = this.props;
                    if (match) {
                        var id = match.params.id;
                        callApi(`/api/products/${id}/details`, 'GET', null).then(res => {
                            if (res) {
                                var review = res.data.product.reviews;
                                this.setState({
                                    review: review
                                })
                            }
                        });
                    }
                } else {
                    swal({
                        title: "Error",
                        text: "You need to login",
                        icon: "warning",
                        dangerMode: true,
                    })
                }
            }).catch(err => {
                //console.log(err);
            });
        }
    }
    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            callApi(`/api/products/${id}/details`, 'GET', null).then(res => {
                //console.log(res.data.product);
                if (res) {
                    var product = res.data.product;
                    var company = res.data.company;
                    var review = res.data.product.reviews;
                    this.setState({
                        product: product,
                        company: company,
                        review: review
                    })
                }
            }).catch(err => {
                //console.log(err)
            });
        }
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
        var { product, review, company ,profile} = this.state;
        var { classname1, classname2, classname3, classname4, classname5 } = this.state;
        var { history } = this.props;
        return (
            <div>
                <NavbarUser history={history}/>
                <div className="mrbot-br"><br></br></div>
                <div className="headerproduct">
                    <h2>
                        {product.name}
                    </h2>
                    <Link to="/">Home</Link>/{product.tag}
                </div>
                <ProductInfo
                    review={review}
                    product={product}
                    history={history}
                    company={company}
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}
                    classname1={classname1}
                    classname2={classname2}
                    classname3={classname3}
                    classname4={classname4}
                    classname5={classname5}
                    onClick={this.onClick}
                />
                <hr></hr>
                <Footer />
            </div>
        )
    }
}

export default ProductDetailsPage
