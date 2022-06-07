import React, { Component } from 'react';
import NavbarUser from './../../../components/User/Client/NavbarUser';
import Product from './../../../components/User/Client/product/Product';
import callApi from './../../../connect/API-caller';
import Footer from '../../../components/User/Client/footer/Footer';
import Categories from '../../../components/User/Client/categories/Categories';
import Slider from './../../../components/User/Client/Slider/Slider'
import Search from '../../../components/User/Client/Search';
import Pagination from "react-js-pagination";

export class ClientPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      category: [],
      favorites: [],
      activePage: 1
    };
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }
  componentDidMount() {
    callApi('/api/products/list?page=1&page_size=15', 'GET', null).then(res => {
      //console.log(res);
      this.setState({
        products: res.data.results,
      });
    }).catch(err => {
      //console.log(err)
    });

    callApi('/api/category', 'GET', null).then(res => {
      //console.log(res.data.results);
      this.setState({
        category: res.data.results
      });
    }).catch(err => {
      //console.log(err)
    });

    // callApi('/api/user/favorites/list', 'GET', null, {
    //   Authorization: `JWT ${localStorage.getItem('token')}`
    // }).then(res => {
    //   if (res) {
    //     // console.log(res.data.results);
    //     this.setState({
    //       favorites: res.data.results
    //     });
    //   }
    // }).catch(err => {
    //   //console.log(err);
    // });
  }

  // showProducts(products) {
  //   var result = null;
  //   var { history } = this.props;
  //   if (products.length > 0) {
  //     result = products.map((product, index) => {
  //       return (
  //         <Product
  //           key={index}
  //           product={product}
  //           index={index}
  //           history={history}
  //         />
  //       );
  //     });
  //   }
  //   return result;
  // }

  // findIndex = (products, id) => {
  //   var result = -1;
  //   products.forEach((product, index) => {
  //     if (product.id === id) {
  //       result = index;
  //     }
  //   });
  //   return result;
  // }

  render() {
    var { products, category } = this.state;
    var { history } = this.props;
    var page = this.state.activePage;
    var temp;
    var result = products.map((product, index) => {
      temp = product;
      if (index >= (page - 1) * 8) {
        if (index < page * 8) {
          return (
            <Product
              key={index}
              product={product}
              index={index}
              history={history}
            />
          );
        } else { return (<div key={index}></div>); }
      } else { return (<div key={index}></div>); }
    });

    return (
      <div>
        <NavbarUser history={history} />
        <div className="mrbot-br"><br></br></div>
        <Search category={category} history={history} />
        <Slider />
        <hr></hr>
        <Categories category={category} />
        <br></br>
        <div className="container">
          <div className="titleproduct">
            <h2>Product List</h2>
            <br></br>
          </div>
          <div className="row">
            {/* {this.showProducts(products)} */}
            {result}
          </div>
          <div className="pageproduct">
            <Pagination
              itemClass="page-item"
              linkClass="page-link"
              activePage={this.state.activePage}
              itemsCountPerPage={8}
              totalItemsCount={this.state.products.length}
              pageRangeDisplayed={8}
              onChange={this.handlePageChange.bind(this)}
            />
          </div>
        </div>
        <Footer />
      </div>
    )

  }

}

export default ClientPage
