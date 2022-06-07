import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import callApi from './../../../../connect/API-caller';
// import Category from '../categories/Category';
import ShowRating from './Rating/ShowRating';
import './Product.css';
export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heart: true
        };
    }

    showcategory(category) {
        var result = null;
        if (category.length > 0) {
            result = category.map((category, index) => {
                // return (<Category category={category} key={index} />);
                return (
                    <h2>{category.name}</h2>
                );
            });
        }
        return result;
    }

    AddCart(id, history) {
        //console.log(id);
        callApi('/api/user/cart/add-to-cart', 'POST', {
            product: id,
            amount: 1
        }, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            if (res) {
                swal("Great!", "Cleared cart successfully!", "success")
                history.push("/mycart");
            } else {
                swal("error", "You need to login!", "error")
            }
        }).catch(err => {
            console.log(err);
        });
    }

    checkHeart(id) {
        if (this.state.heart) {
            const formData = new FormData();
            formData.append('product', id)
            callApi('/api/user/favorites/create', 'POST', formData, {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }).then(res => {
                if (res) {
                    //console.log(res);
                    this.setState({
                        heart: false
                    })
                    console.log(this.state.heart)
                    swal("Great!", "Favour Successfully!", "success")
                } else {
                    callApi(`/api/user/favorites/${id}/delete`, 'DELETE', null, {
                        Authorization: `JWT ${localStorage.getItem('token')}`
                    }).then(res => {
                        this.setState({
                            heart: true
                        })
                        console.log(this.state.heart)
                        callApi('/api/user/favorites/create', 'POST', formData, {
                            Authorization: `JWT ${localStorage.getItem('token')}`
                        }).then(res => {
                            if (res) {
                                //console.log(res);
                                this.setState({
                                    heart: false
                                })
                                console.log(this.state.heart)
                                swal("Great!", "Favour Successfully!", "success")
                            } else {
                                swal("error", "Products already exist.", "error")
                            }
                        }).catch(err => {
                            //console.log(err);
                            swal("error", "Products already exist.", "error")
                        });
                    })
                }
            }).catch(err => {
                //console.log(err);
                swal("error", "You need to login!", "error")
            });
        } else {
            callApi(`/api/user/favorites/${id}/delete`, 'DELETE', null, {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }).then(res => {
                //console.log(res);
                this.setState({
                    heart: true
                })
                console.log(this.state.heart)
                swal("Great!", "Disfavour Successfully!", "success")
            }).catch(err => {
                swal("error", "Products already exist.", "error")
                //console.log(err);
            });
        }
    }

    showiconheart() {
        var id = this.props.product.id;
        if (this.state.heart) {
            return (
                <div className="iconheart" onClick={() => this.checkHeart(id)}>
                    <i className="fas fa-heart"></i>
                </div>);
        } else {
            return (
                <div className="iconheart-o" onClick={() => this.checkHeart(id)}>
                    <i className="fas fa-heart"></i>
                </div>);
        }
    }

    showimgproduct(){
        var img = this.props.product.image;
        if(img != null){
            return(img);
        }else{
            return("/assets/img/theme/productnull.png");
        }
    }
    render() {
        var { product, history } = this.props;
        var { category } = product;
        var id = this.props.product.id;
        var name = product.name;
        return (

            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mrtop">
                <div className="hovereffect">
                    <Link to={`/productdetails/${id}/detail`}>
                        <img className="img-responsive"
                            src={this.showimgproduct()}
                            alt="jsx-a11y/alt-text" />
                    </Link>
                    <div className="over">
                        {this.showcategory(category)}
                        <h1>${product.price}</h1>
                    </div>
                </div>
                <div className="nameproduct">
                    <Link
                        to={`/productdetails/${id}/detail`}>
                        <h1>{name.substr(0, 10)}</h1>
                    </Link>
                    <ShowRating rating={product.rating} />
                </div>
                <div className="addcart">
                    {this.showiconheart()}
                    <div className="addtocart"
                        onClick={() => this.AddCart(id, history)}>
                        <i className="fas fa-cart-plus"></i>
                    </div>
                </div>
            </div>
        )
    }
}
