import React, { Component } from 'react'
import NavbarUser from '../../../components/User/Client/NavbarUser';
import './../../../App.css'
import Footer from '../../../components/User/Client/footer/Footer';
import { Link } from 'react-router-dom';
import callApi from '../../../connect/API-caller';
import swal from 'sweetalert';
import Myreviews from '../../../components/User/Client/myhome/Myreviews';

export class MyReviewPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: [],
            historycart:[],
            products:[],
            faproducts:[],
            cartproducts:[],
            myproducts:[]
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

        callApi('/api/user/cart/history/?page=1', 'GET', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            if (res) {
                //console.log(res.data.results);
                this.setState({
                    historycart: res.data.results
                });
            }
        }).catch(err => {
            //console.log(err);
        });
        callApi('/api/user/review/list?page=1&page_size=10', 'GET', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            if (res) {
                //console.log(res.data.results);
                this.setState({
                    products: res.data.results
                });
            }
        }).catch(err => {
            //console.log(err);
        });
        callApi('/api/user/favorites/list?page=1&page_size=10', 'GET', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            //console.log(res.data.results);
            this.setState({
                faproducts:res.data.results
            })
        }).catch(err => {
            //console.log(err);
        });
        callApi('/api/user/cart/view-cart', 'GET', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            if (res) {
                //console.log(res.data.cart_detail);
                this.setState({
                    cartproducts: res.data.cart_detail
                });
            }
        }).catch(err => {
            console.log(err);
        });
        callApi('/api/user/product/my-product/', 'GET', null, {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }).then(res => {
            if (res) {
                //console.log(res.data.count);
                this.setState({
                    myproducts: res.data.count
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        var {profile,historycart,products,faproducts,cartproducts,myproducts} =this.state;
        return (
            <div>
                <NavbarUser />
                <div className="mrbot-br"><br></br></div>
                <div className="containerw">

                    <div className="row">
                        <div className="row-left">
                            <div className="row-left-content">
                                <Myreviews products={products} />
                            </div>
                        </div>

                        <div className="row-right">

                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="row-right-top">
                                                <div className="row-right-top-img">
                                                    <img src={profile.avatar} className="img-responsive" alt="Image" />
                                                </div>
                                                <div className="row-right-top-name"><h2>{profile.first_name} {profile.last_name}</h2></div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="mytable"><Link to="/admin/profile"><h2><i className="far fa-address-card"></i> Profile</h2></Link></td>
                                    </tr>
                                    <tr>
                                        <td className="mytable"><Link to="/myinvoices"><h2><i className="fas fa-plus-circle"></i> My Invoices</h2><span>{historycart.length}</span></Link></td>
                                    </tr>
                                    <tr>
                                        <td className="mytable"><Link to="/admin/product"><h2><i className="fas fa-chalkboard-teacher"></i> My Product</h2><span>{myproducts}</span></Link></td>
                                    </tr>
                                    <tr>
                                        <td className="mytable"><Link to="/mycart"><h2><i className="fas fa-cart-plus"></i> My Cart</h2><span>{cartproducts.length}</span></Link></td>
                                    </tr>
                                    <tr>
                                        <td className="mytable"><Link to="/myfavorites"><h2><i className="fas fa-heart"></i> My Favorites</h2><span>{faproducts.length}</span></Link></td>
                                    </tr>
                                    <tr>
                                        <td className="mytable"><Link to="/myreviews"><h2><i className="fas fa-star"></i> My Reviews</h2><span>{products.length}</span></Link></td>
                                    </tr>
                                    <tr>
                                        <td className="mytable"><Link to="/" ><h2 onClick={this.logout}>
                                            <i className="ni ni-user-run"></i> LogOut</h2></Link></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        )
    }
    logout = (e) =>{
        e.preventDefault()
        var {history} = this.props;
        callApi('/user/logout/', 'GET', null, {
            Authorization: `JWT ${this.state.token}`
       }).then( res =>{
           localStorage.clear('token')
           history.push("/");
       }).catch(err =>{
           console.log(err)
       })
      swal("Succsess !!!", {
        icon: "success",
      });
     }
}

export default MyReviewPage
