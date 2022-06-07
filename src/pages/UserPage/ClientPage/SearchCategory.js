import React, { Component } from 'react';
import NavbarUser from '../../../components/User/Client/NavbarUser';
import Footer from '../../../components/User/Client/footer/Footer';
import Search from '../../../components/User/Client/Search';
import callApi from './../../../connect/API-caller';
import Product from '../../../components/User/Client/product/Product';
import { Link } from 'react-router-dom';

export default class SearchCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            categorys: []
        };
    }

    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            callApi('/api/category/search/?order_by=-id', 'POST', {
                key_word: "",
                category: id
            }).then(res => {
                console.log(res.data.results)
                this.setState({
                    category: res.data.results
                });
            }).catch(err => {
                //console.log(err)
            });
        }
        callApi('/api/category', 'GET', null).then(res => {
            //console.log(res.data.results);
            this.setState({
                categorys: res.data.results
            });
        }).catch(err => {
            //console.log(err)
        });
    }
    showProducts(category) {
        var result = null;
        if (category.length > 0) {
            result = category.map((product, index) => {
                return (
                    <Product
                        key={index}
                        product={product}
                        index={index}
                    />
                );
            });
        } else {
            return (
                <div class="container">
                    <nav className="navbar navbar-horizontal navbar-dark bg-warning">
                        <div className="container">
                            <a className="navbar-brand">No Product</a>
                        </div>
                    </nav>
                </div>
            );
        }
        return result;
    }

    render() {
        var { category, categorys } = this.state;
        var { match } = this.props;
        var { history } = this.props;
        return (
            <div>
                <NavbarUser history={history}/>
                <div className="mrbot-br"><br></br></div>
                <Search category={categorys} history={history} />
                <div className="name-category">
                    <h1>{match.params.id}</h1>
                    <h2><Link to="/">Home</Link>/{match.params.id}</h2>
                    <br></br>
                </div>
                <div className="m-h-800px">

                    <div className="container">
                        <div className="row">
                            {this.showProducts(category)}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
