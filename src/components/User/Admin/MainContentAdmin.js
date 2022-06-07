import React, { Component } from 'react';
// import {Route} from "react-router-dom";
import { Switch, Route } from 'react-router-dom';

import ManageCompany from '../../../pages/UserPage/AdminPage/ManageCompany';
import ManageCompanyAction from '../../../pages/UserPage/AdminPage/ManageCompanyAction';
import DetailCompany from './ManageCompany/DetailCompany';
import ListDelectCompany from './ManageCompany/ListDeleteCompany';
import { AddBank } from './ManageCompany/AddBank';
import SocialAdd from './ManageCompany/SocialAdd';
import VerificationCompany from './ManageCompany/VerificationCompany';
import AddTokenBank from './ManageCompany/Stripe.js/AddTokenBank';
import CreateStripe from './ManageCompany/Stripe.js/CreateStripe';
import ListSubscription from './ManagerSubscription/ListSubscription';

import ManageProduct from '../../../pages/UserPage/AdminPage/products/ManageProduct';
import ManageProductAction from '../../../pages/UserPage/AdminPage/products/ManageProductAction';
import PopulerProduct from '../../../pages/UserPage/AdminPage/products/PopulerProduct';
import ListDeleteProduct from '../../../pages/UserPage/AdminPage/products/ListDeleteProduct';

import ManageProGroup from '../../../pages/UserPage/AdminPage/progroups/ManageProGroup';
import ManageProGroupAction from '../../../pages/UserPage/AdminPage/progroups/ManageProGroupAction';
import ListAllProGroup from '../../../pages/UserPage/AdminPage/progroups/ListAllProGroup';
import ListDeleteProGroup from '../../../pages/UserPage/AdminPage/progroups/ListDeleteProGroup';

import MyProfile from '../../../pages/UserPage/AdminPage/MyProfile';
import ProfilePassword from '../../../pages/UserPage/AdminPage/ProfilePassword';
import ABC from './ManageCompany/JustTest';
import AddSub from './ManagerSubscription/AddSup';
import TERGEN from './ManageCompany/autocomplete';


// import NotFoundPage from '../../../pages/NotFoundPage/NotFoundPage';
// import routes from './RouteAdmin';
const routes=[
    {
        path :'/admin',
        exact : true,
        main: () => <ManageCompany />
    },
    // ===========================================COMPANY==========================================
    {
        path :'/admin/company',
        exact : true,
        main: () => <ManageCompany />
    },
    {
        path :'/admin/company/add',
        exact : false,
        main: ({history}) => <ManageCompanyAction  history={history}/>
    },
    {
        path: '/admin/company/:site/edit',
        exact: false,
        main: ({match, history})=> <ManageCompanyAction  match={match} history={history} />
    },

    {
        path: '/admin/company/:site/detail',
        exact: false,
        main: ({match, history})=> <DetailCompany  match={match} history={history} />
    },
    {
        path: '/admin/company/listdelete',
        exact: false,
        main: ()=> <ListDelectCompany />
    },  
    {
        path :'/admin/company/add_bank',
        exact : false,
        main: () => <AddBank  />
    },
    {
        path :'/admin/company/:site/AddSocial',
        exact : false,
        main: ({match, history}) => <SocialAdd history={history} match={match}/>
    },
    {
        path :'/admin/company/Verification',
        exact : false,
        main: () => <VerificationCompany/>
    },
    {
        path :'/admin/company/BankToken',
        exact : false,
        main: () => <CreateStripe />
    },
    {
        path :'/admin/company/ListSubsciption',
        exact : false,
        main: () => <ListSubscription />
    },
    {
        path :'/admin/company/Subscription',
        exact : false,
        main: () =>  <AddSub/>
    },
  
    // ===========================================PRODUCT==========================================
        {
            path :'/admin/product',
            exact : true,
            main: () => <ManageProduct />
            // main: () => <ProductTabs />
        },
        {
            path :'/admin/product/add',
            exact : true,
            main: ({history}) => <ManageProductAction history={history}/>
        },
        {
            path : '/admin/product/:id/edit',
            exact : true,
            main : ({match,history}) => <ManageProductAction match={match} history={history}/>
        },
        {
            path :'/admin/populerproduct',
            exact : true,
            main: () => <PopulerProduct />
        },
        {
            path :'/admin/listdelproduct',
            exact : true,
            main: () => <ListDeleteProduct />
        },
    // ===========================================PRODUCT GROUP==========================================
        {
            path :'/admin/listproductgroup',
            exact : true,
            main: () => <ListAllProGroup />
            // main: () => <ProductModal />
        },
        {
            path :'/admin/productgroup',
            exact : true,
            main: () => <ManageProGroup />
            // main: () => <ProductModal />
        },
        {
            path :'/admin/productgroup/add',
            exact : true,
            main: ({history}) => <ManageProGroupAction history={history}/>
        },
        {
            path : '/admin/productgroup/:id/edit',
            exact : true,
            main : ({match,history}) => <ManageProductAction match={match} history={history}/>
        },
    // ===========================================MY PROFILE==========================================
        {
            path :'/admin/profile',
            exact : true,
            main: () => <MyProfile />
            
        },
        {
            path :'/admin/updatepassword',
            exact : true,
            main: () => <ProfilePassword />
            
        }
]
export class MainContentAdmin extends Component {
    render() {
        let mapRoute = routes.map((r, index) =>{
            return (
                <Switch key={index}>
                    <Route
                    
                    exact={r.exact}
                        path={r.path}
                        component={r.main}
                    />
                </Switch>
            )
        })
        
        return (
            <div>
                {mapRoute}
                {/* <Route path="/admin"
                    exact component={ManageCompany}
                />
                <Route path="/admin/company"
                  exact  component={ManageCompany}
                />
                <Route path="/admin/company/add"
                    component={ManageCompanyAction} 
                />
                <Route path="/admin/product"
                   exact component={ManageProduct}
                />
                <Route path="/admin/product/add"
                    component={ManageProductAction}
                />
                <Route path="/admin/subcription"
                    component={MyProfile}
                /> */}
                {/* <Route path=""
                    component={NotFoundPage}
                /> */}
            </div>
            // <Router>
            //     <div>
            //         {this.showContentAdmin(routes)}
            //     </div>
            // </Router>
        )
    }
    // showContentAdmin = (routes) => {
    //     var result = null;
    //     if (routes.length > 0) {
    //       result = routes.map((route, index) => {
    //         return (
    //           <Route
    //             key={index}
    //             path={route.path}
    //             // exact={route.exact}
    //             component={route.main}
    //           />
    //         );
    //       });
    //     }
    //     return <Switch>{result}</Switch>
    //   }
}

export default MainContentAdmin
