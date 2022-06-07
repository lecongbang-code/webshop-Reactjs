import React from 'react'
import ClientPage from './pages/UserPage/ClientPage/ClientPage';
import AuthPage from './pages/AuthPage/AuthPage';
import AdminPage from './pages/UserPage/AdminPage/AdminPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import CartPage from './pages/UserPage/ClientPage/CartPage';
import ProductDetailsPage from './pages/UserPage/ClientPage/ProductDetailsPage';
import PaymentPage from './pages/UserPage/ClientPage/PaymentPage';
// import ManageCompanyAction from './pages/UserPage/AdminPage/ManageCompanyAction';
import FeaturedProducts from './pages/UserPage/ClientPage/FeaturedProducts';
import RecentProduct from './pages/UserPage/ClientPage/RecentProduct';
import Contact from './pages/UserPage/ClientPage/Contact';
import ForgotPassword from './pages/UserPage/ClientPage/ForgotPassword';
import SubscriptionPage from './pages/UserPage/ClientPage/SubscriptionPage';
import SearchCategory from './pages/UserPage/ClientPage/SearchCategory';
import HomePage from './pages/UserPage/ClientPage/HomePage';
import MyFavoritesPage from './pages/UserPage/ClientPage/MyFavoritesPage';
import MyReviewPage from './pages/UserPage/ClientPage/MyReviewsPage';
import Emailconfirm from './pages/UserPage/ClientPage/Emailconfirm';
const  routes = [
    {
        path :'/',
        exact : true,
        main: ({history}) => <ClientPage history={history} />
    },
    {
        path :'/home',
        exact : false,
        main: ({history}) => <ClientPage history={history}/>
    },
    {
        path :'/login',
        exact : false,
        main: ({history}) => <AuthPage history={history}/>
    },
    {
        path :'/myinvoices',
        exact : false,
        main: ({match,history}) => <HomePage match={match} history={history}/>
    },
    {
        path :'/myfavorites',
        exact : false,
        main: ({history}) => <MyFavoritesPage history={history}/>
    },
    {
        path :'/myreviews',
        exact : false,
        main: ({history}) => <MyReviewPage history={history}/>
    },
    {
        path :'/register',
        exact : false,
        main: ({history}) => <AuthPage history={history}/>
    },
    {
        path :'/admin',
        exact : false,
        main: () => <AdminPage />
    },
    {
        path :'/searchCategory/:id',
        exact : false,
        main: ({match}) => <SearchCategory match={match}/>
    },
    {
        path :'/mycart',
        exact : false,
        main: ({history}) => <CartPage history={history}/>
    },
    {
        path :'/productdetails/:id/detail',
        exact : false,
        main: ({match , history}) => <ProductDetailsPage match={match} history={history}/>
    },
    // {
    //     path :'/admin/company/add',
    //     exact : false,
    //     main: ({history}) => <ManageCompanyAction  history={history}/>
    // },
    // {
    //     path: '/admin/company/:site/edit',
    //     exact: false,
    //     main: ({match, history})=> <ManageCompanyAction  match={match} history={history} />
    // },

    {
        path :'/payment',
        exact : false,
        main: ({history}) => <PaymentPage history={history} />
    },
    {
        path :'/featuredproducts',
        exact : false,
        main: () => <FeaturedProducts />
    },
    {
        path :'/recentproduct',
        exact : false,
        main: () => <RecentProduct />
    },
    {
        path :'/contact',
        exact : false,
        main: () => <Contact />
    },
    {
        path :'/forgotpassword',
        exact : false,
        main: ({history}) => <ForgotPassword history={history}/>
    },
    {
        path :'/subscription',
        exact : false,
        main: () => <SubscriptionPage/>
    },
    {
        path :'/emailconfirm',
        exact : false,
        main: ({history}) => <Emailconfirm history={history}/>
    },
    {
        path :'',
        exact : false,
        main: () => <NotFoundPage />
    }
];

export default routes;
