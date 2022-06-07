import React, { Component } from 'react';
import ListProGroupItem from '../../../../components/User/Admin/ManageProGroup/ListProGroupItem';
import Axios from 'axios';
import * as Config from '../../../../connect/Config';
import Pagination from "react-js-pagination";

export class ListAllProGroup extends Component {
    constructor(props){
        super(props);
        this.state=({
            proGroups:[],
            activePage: 1,
            token: localStorage.getItem('token')
        });
    }
    componentDidMount(){
        Axios.get(`${Config.API_URL}/api/user/productgroup/`,{
            headers:{ Authorization: `JWT ${this.state.token}`}
        }).then(res=>{  
            console.log(res.data.results);
            this.setState({proGroups:res.data.results});
        }).catch(err=>{
            console.log(err);
        });
    }
    // resultProGroup(progroups){
    //     var result = progroups.map((progroup, index)=>{
    //         return(
    //             <ListProGroupItem
    //                 key={index}
    //                 index={index}
    //                 progroup={progroup}
    //             />
    //         )
    //     })
    //     return result;
    // }
    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
    }
    render() {  
        var { proGroups} = this.state;
        var page = this.state.activePage;
        var temp;
        var result = proGroups.map((proGroup, index) => {
            temp = proGroups;
            if (index >= (page - 1) * 5) {
                if (index < page * 5) {
                    return (
                        <ListProGroupItem
                        key={index}
                        index={index}
                        proGroup={proGroup}
                    />
                    );
                } else { return (<tr key={index}></tr>); }
            } else { return (<tr key={index}></tr>); }
        })
        if (temp) {
            return (
                <div className="n-form-admin">
                    <table className="table align-items-center n-tble col-12 table-hover">
                        <thead className="n-table-title">
                            <tr>
                                <th scope="col" className="sort n-col-big">Number</th>
                                <th scope="col" className="sort n-col-big">Id</th>
                                <th scope="col" className="sort n-col-big">Name</th>
                                <th scope="col" className="sort n-col-big">Info</th>
                                <th scope="col" className="sort n-col-big">Company ID</th>
                            </tr>
                        </thead>
                        <tbody className="list">
                                {/* {this.resultProGroup(progroups)} */}
                                {result}
                        </tbody>
                    </table>
                    <div className="col-3 row mt-3">
                                <Pagination
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={5}
                                    totalItemsCount={this.state.proGroups.length}
                                    pageRangeDisplayed={5}
                                    onChange={this.handlePageChange.bind(this)}
                                />
                                </div>
                </div>
            )
        }
       else{
        return (
            <div className="n-form-admin">
                <h2 className="text-center">No product group</h2>
            </div>
        )
       }
    }
}

export default ListAllProGroup
