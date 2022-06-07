import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import '../Admin.css';
import * as Config from '../../../../connect/Config';

export class ManageProGroupAction extends Component {
    constructor(props){
        super(props)
        this.state={
            id:'',
            company:[],
            storeName: '',
            txtCompany:'',
            txtName:'',
            txtInfo:'',
            token: localStorage.getItem('token')
        }
    }
    componentDidMount() {
        var { match } = this.props;
        axios.get(`${Config.API_URL}/api/user/company/my-company/`,{
                headers:{ Authorization: `JWT ${this.state.token}`}
            }).then(res=>{  
                // console.log(res.data.results);
                this.setState({company:res.data.results});
            }).catch(err=>{
                console.log(err);
            });
        if (match && match !== null) {
            var id = match.params.id;
            axios.get(`${Config.API_URL}/api/user/productgroup/${id}/`,{
                headers: { Authorization: `JWT ${this.state.token}` }
            }).then(res=>{
                this.setState({
                    id:id,
                    txtCompany: res.data.company,
                    txtInfo: res.data.info,
                    txtName: res.data.name
                })
                // console.log(res.data.company,res.data.name)
            }).catch((error) => {   
                console.log(error);
            })
        }
    }
    onChangeProGroup = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmitProGroup=(e)=>{
        var {id,txtCompany,txtInfo,txtName} = this.state;
        var {history} = this.props;
        e.preventDefault();
        const formData = new FormData();
            formData.append('company', txtCompany)
            formData.append('name', txtName)
            formData.append('info', txtInfo)
            if(id){
                axios.put(`${Config.API_URL}/api/user/productgroup/${id}`, formData, {
                    headers: { Authorization: `JWT ${this.state.token}` }
                    }).then(res => {
                        // console.log(res)
                        swal("EDIT SUCCSESS!", "ADD SUCCSESS", "success");
                        history.goBack();
                    }).catch(function (err) {
                        console.log(err.res);
                    })
            }  
            else{
                axios.post(`${Config.API_URL}/api/user/productgroup/`, formData, {
                    headers: { Authorization: `JWT ${this.state.token}` }
                    }).then(res => {
                        // console.log(res)
                        swal("EDIT SUCCSESS!", "ADD SUCCSESS", "success");
                        history.goBack();
                    }).catch(function (err) {
                        console.log(err.res);
                    })
            }
    }
    render() {
        var{company,storeName, txtCompany,txtName,txtInfo}=this.state
        var { match } = this.props;
        var myCompany = null
        if (match && match !== null) {
            myCompany = <option>{storeName}</option>
        } else {
            myCompany = company.map((myCompany, index) => {
                return (
                    
                    <option 
                        key={index}
                        value={myCompany.id}
                    >
                        {myCompany.store_name}
                    </option>
                )
            });
        }
        return (
            <form className="mt-2 n-form-admin" onSubmit={this.onSubmitProGroup}>
                <div className="form-group col-4">
                    <label>Select Company:</label>
                    <select className="form-control" name="txtCompany" value={this.state.txtCompany} onChange={this.onChangeProGroup}>
                        {myCompany}
                        <option></option> 
                    </select>
                </div>
                <div className="form-group col-12">
                    <label>Name:</label>
                    <input type="text" className="form-control" name="txtName"
                        value={txtName}
                        onChange={this.onChangeProGroup} />
                </div>
                <div className="form-group col-12">
                    <label>Info:</label>
                    <input type="text" className="form-control" name="txtInfo"
                        value={txtInfo}
                        onChange={this.onChangeProGroup} />
                </div>
                <div className="row col-3">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <Link to="/admin/productgroup" type="button" className="btn btn-outline-primary">Come back</Link>
                </div>
            </form>
        )
    }
}

export default ManageProGroupAction
