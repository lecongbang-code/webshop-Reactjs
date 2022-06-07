import React, { Component } from 'react'
import NavbarAdmin from '../NavbarAdmin'
import ContentAdmin from '../ContentAdmin'
import callApi from '../../../../connect/API-caller';
import { Link } from 'react-router-dom';


export default class DetailCompany extends Component {

    constructor(props){
        super(props);
        this.state= {
          id: '',
          user: '',
          store_name: '',
          address: '',
          phone_number: '',
          site: '',
          legal_name:'',
          business_license:'',
          about: '',
          caterory:'',
          logo: '',
          fileLogo: '../assets/img/banner/logo.jpg',
          token: localStorage.getItem('token'), 
          
          

          
        }
      }

     
      componentDidMount() {
        var {match} = this.props; 
         console.log(match)
         var site = match.params.site; 
           if(site != null){
           console.log(match)

      callApi(`/api/user/company?site=${site}`, 'GET', null,   { Authorization:`JWT ${this.state.token}`}).then(res => {
      var data = res.data;
      console.log(data)
      this.setState({
        id: data.id,
        user: data.user,
        store_name: data.store_name, 
        address: data.address,
         phone_number: data.phone_number,
        legal_name: data.legal_name,
        site:data.site,
        business_license: data.business_license,
        about: data.about,
        category: data.category,
        logo: data.logo
      }); 
    });
}
}    

Catarories=(category)=>{
  
  if(category=1){
    return 'Computer'
  }
  else if(category=2){
    return 'Laptop'
  }
 if(category=3){
    return 'Tablet'
  }
 if(category=4){
    return 'SmartWatch'
  }
  else{
    return 'Macbook'
  }
} 



    render() {
        var {id, user, store_name, address, phone_number,legal_name, site, business_license, about, category, logo } = this.state
        return (
            <div>
         
             
           
        
        <div className="panel panel-danger">
              <div className="panel-heading">
                    <h3 className="panel-title"></h3>
              </div>
              <div className="panel-body">
              <div className="list-group">
                    <a  className="list-group-item active">
                  DETAIL COMPANY :   <b>{store_name}</b>
                    </a>
                            <a className="list-group-item"> <span>ID:</span> 
                             {id}</a>
                            <a className="list-group-item"> <span>USER:</span> 
                              {user}</a>
                              <div className="form-group">
                                                <h3>Logo</h3>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="logoImage"
                                                >
                                                    <img id="target" src={this.state.logo} width={200} height={150} />
                                                </label>
                                                </div>
                            <a className="list-group-item">  <span class="monkey">STORE NAME:</span>
                           {store_name}</a>
                            <a className="list-group-item"><span className="monkey">ADDRESS:</span>
                            {address}</a> 
                           
                            <a className="list-group-item"><span className="monkey">PHONE NUMBER:</span>
                            {phone_number}           </a>
                          
                            <a className="list-group-item"><span className="monkey">LEGAL NAME :</span>
                            {legal_name} </a>
                           
                            <a className="list-group-item"> <span className="monkey">BUSINESS LICENSE:</span>
                            {business_license}                    </a>
                           
                            <a className="list-group-item"> <span className="monkey">CATEGORY:</span>
                            {this.Catarories()}                    </a>

                            <a className="list-group-item"> <span className="monkey">ABOUT : </span>
                             {about}</a>

                    

                    

                    </div>
              </div>
        </div>
        
         <Link to='/admin/company' className="btn btn-primary .ml-50" type="button"> Back <span className="badge"></span></Link>
             
              
            </div> 
        )
    }

    
}
