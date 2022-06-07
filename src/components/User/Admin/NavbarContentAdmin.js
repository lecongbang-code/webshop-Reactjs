import React, { Component } from 'react'
import callApi from '../../../connect/API-caller'
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

import './Admin.css';

export class NavbarContentAdmin extends Component {
    constructor(props){
        super(props);
        let logIn = true
        this.state = {
            name: '',
            avatar:'',
            token: localStorage.getItem('token'),
            logIn
        }
    }
    componentWillMount(){
        
        callApi('/api/auth/profile', 'GET', null, {
            Authorization: `JWT ${this.state.token}`
        })
        .then(res => {
            let myname = res.data.last_name;
            let myavatar =res.data.avatar;
            localStorage.setItem('myname', myname)
            localStorage.setItem('myavatar', myavatar)
            this.setState({
                name: res.data.last_name,
                avatar:res.data.avatar
            })
        }).catch(err =>{
            console.log(err);
        });
    }
    logout = (e) =>{
        e.preventDefault()
        swal({
            title: "Do you want to log out ?",
           
            icon: "info",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

                callApi('/user/logout/', 'GET', null, {
                    Authorization: `JWT ${this.state.token}`
               }).then( res =>{
                   console.log(res)
                 
                   localStorage.clear('token')
                   this.setState({
                       logIn: false
                   })
               }).catch(err =>{
                   console.log(err)
               })

              swal("Succsess !!!", {
                icon: "success",
              });
            } else {
              //swal("C");
            }
          });

          

     }
     onChange= (e) =>{
        var target = e.target;
        var name= target.name;
        this.setState({
          [name]: e.target.value
        });
      }

    render() {
        if(this.state.logIn === false){
            return <Redirect to="/" />
        }
        return (
            <nav className="navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* Search form */}
                        {/* <form className="navbar-search navbar-search-light form-inline mr-sm-3 col-5" id="navbar-search-main">
                            <div className="form-group mb-0">
                                <div className="input-group input-group-alternative input-group-merge">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-search"></i></span>
                                    </div>
                                    <input className="form-control" placeholder="Search" type="text" />
                                </div>
                                </div>
                                <button type="button" className="close" data-action="search-close" data-target="#navbar-search-main" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                             </form> */}
                            {/* Navbar links */}
                            <ul className="navbar-nav ml-auto float-right pr-3 n-nav-content-avat">
                                <li className="nav-item dropdown">
                                    <a className="nav-link pr-0" href="aaa" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <div className="media align-items-center">
                                            <span className="avatar avatar-sm rounded-circle">
                                                <img src={this.state.avatar} alt="hinh anh" />
                                            </span>
                                            <div className="media-body  ml-2  d-none d-lg-block">
                                  <span className="mb-0 text-sm  font-weight-bold">{this.state.name}</span>
                                            </div>
                                        </div>
                                    </a>
                                    <div className="dropdown-menu  dropdown-menu-right ">
                                        <div className="dropdown-header noti-title">
                                            <h6 className="text-overflow m-0">Welcome!</h6>
                                        </div>
                                        <a href="/admin/profile" className="dropdown-item">
                                            <i className="ni ni-single-02" />
                                            <span>My profile</span>
                                        </a>
                                        <a href="aaa" className="dropdown-item">
                                            <i className="ni ni-settings-gear-65" />
                                            <span>Settings</span>
                                        </a>
                                        <a href="aaa" className="dropdown-item">
                                            <i className="ni ni-calendar-grid-58" />
                                            <span>Activity</span>
                                        </a>
                                        <a href="aaa" className="dropdown-item">
                                            <i className="ni ni-support-16" />
                                            <span>Support</span>
                                        </a>
                                        <div className="dropdown-divider" />
                                        <a onClick={this.logout} href="aaa" className="dropdown-item">
                                            <i className="ni ni-user-run" />
                                            <span>Logout</span>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                    </div>
                    </div>
            </nav>

        )
    }
}

export default NavbarContentAdmin
