import React, { Component } from 'react'
import swal from 'sweetalert';

export default class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      namecategory: ""
    };
  }
  showCategory(category) {
    var result = null;
    if (category.length > 0) {
      result = category.map((category, index) => {
        return (
        <option value={category.name} key={index}>
            {category.name}
        </option>);
      });
    }
    return result;
  }
  
  onChange = (e) => {
    this.setState({namecategory:e.target.value});
  }

  onSearch = (ev) => {
    ev.preventDefault();
    console.log(this.state.namecategory)
    var {history} = this.props;
    if(this.state.namecategory != ""){
      history.push(`/searchCategory/${this.state.namecategory}`)
    }else{
      swal("Error!", "Value Search Null!", "error")
    }
  };

  render() {
    var {category} =this.props;
    return (
      <div className="container">
        <div className="row">
          <form className="navbar-search navbar-search-light form-inline mr-sm-3 search" onSubmit={this.onSearch} id="navbar-search-main">
            <div className="form-group mb-0">
              <div className="input-group input-group-alternative input-group-merge">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-search" /></span>
                </div>
                <div className="selectct">
                  <div className="searchct"><input className="form-control" placeholder="Search" type="text" /></div>
                  <div className="optionct">
                    <select className="custom-select btn"
                    value={this.state.namecategory || ""}
                    onChange={this.onChange}
                    >
                      <option value={0}>Search a category:</option>
                      {this.showCategory(category)}
                    </select>
                  </div>
                </div>
                <div className="input-group-prepend">
                  <button type="submit" className="btn"><i className="fas fa-search" />-Search</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
